//四舍五入,取n位小数
//pow 参数是 10的 n次幂,
export default (v, n) => {
    return Math.round(v * Math.pow(10, n)) / Math.pow(10, n);
}