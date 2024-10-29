"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollToTop = useScrollToTop;
const react_1 = require("react");
function useScrollToTop() {
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
}
//# sourceMappingURL=useScrollToTop.js.map