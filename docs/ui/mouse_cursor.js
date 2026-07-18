const rotate_cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67'/></svg>") 12 12, auto`;

function get_cursor(is_in_box, is_in_moon, is_in_edge) {
    if (is_in_box) {
        return "pointer";
    } else if (is_in_moon) {
        return rotate_cursor;
    } else if (is_in_edge) {
        return "all-scroll";
    }
    return "";
}

export {get_cursor};

