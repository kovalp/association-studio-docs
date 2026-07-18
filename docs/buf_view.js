

class BufView {
    /**
     * @param {number} ini_size - Initial flat length of the array
     * @param {new (size: number) => TypedArray} TypedArrayConstructor - e.g., Float32Array, Int32Array
     * @param {'exact' | '2x'} growth - Growth strategy
     */
    constructor(ini_size, TypedArrayConstructor, growth) {
        this.TypedArrayConstructor = TypedArrayConstructor;
        this._buf = new TypedArrayConstructor(ini_size);
        this.exact = growth === "exact";
    }

    _get_new_size(size) {
        return this.exact ? size : Math.max(size, this._buf.length * 2);
    }

    _get_view(size, content) {
        // Equivalent to python's self._buf[:size] using a live memory view
        const view = this._buf.subarray(0, size);

        if (typeof content === "number") {
            view.fill(content);
        } else if (content && (content.buffer instanceof ArrayBuffer || Array.isArray(content))) {
            // Equivalent to view[:] = content.reshape(size)
            // Works if content is a native array or another TypedArray
            view.set(content);
        }
        return view;
    }

    /**
     * Allocates/recycles buffer and returns a reshaped multidimensional view
     * @param {number[]} shape - Array of dimensions, e.g., [3, 4]
     * @param {number|TypedArray|number[]|null} content - Initial fill state
     */
    get_it(shape, content) {
        // Math.prod(shape) implementation
        const size = shape.reduce((a, b) => a * b, 1);

        if (size > this._buf.length) {
            this._buf = new this.TypedArrayConstructor(this._get_new_size(size));
        }

        const flatView = this._get_view(size, content);
        return this._reshape(flatView, shape);
    }

    /**
     * Helper to add a shape metadata layout mapping over flat memory segments
     */
    _reshape(flatView, shape) {
        if (shape.length <= 1) return flatView;

        // Precompute strides for multidimensional addressing
        const strides = new Array(shape.length);
        let currentStride = 1;
        for (let i = shape.length - 1; i >= 0; i--) {
            strides[i] = currentStride;
            currentStride *= shape[i];
        }

        // Return a proxy that lets you do matrix[r][c] syntax cleanly
        const createDimAccessor = (offset, dimIdx) => {
            if (dimIdx === shape.length - 1) {
                return new Proxy(flatView, {
                    get: (target, prop) => {
                        if (typeof prop === "string" && !isNaN(prop)) {
                            return target[offset + Number(prop) * strides[dimIdx]];
                        }
                        return target[prop];
                    },
                    set: (target, prop, value) => {
                        if (typeof prop === "string" && !isNaN(prop)) {
                            target[offset + Number(prop) * strides[dimIdx]] = value;
                            return true;
                        }
                        target[prop] = value;
                        return true;
                    }
                });
            }

            return new Proxy({}, {
                get: (target, prop) => {
                    if (typeof prop === "string" && !isNaN(prop)) {
                        const idx = Number(prop);
                        return createDimAccessor(offset + idx * strides[dimIdx], dimIdx + 1);
                    }
                    if (prop === 'flatView') return flatView;
                    if (prop === 'shape') return shape;
                }
            });
        };

        return createDimAccessor(0, 0);
    }
}