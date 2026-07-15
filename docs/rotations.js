function get_angle(v1, v2) {
    return Math.atan2(v1.x * v2.y - v1.y * v2.x, v1.x * v2.x + v1.y * v2.y);
}

export {get_angle};
