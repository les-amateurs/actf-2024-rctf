"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyItemDefaults = void 0;
const util_1 = require("../util");
const ItemDefaults = {
    id: '',
    name: '',
    description: '',
    price: 100,
    resourceUrl: '',
    type: 'font',
    resourceName: ''
};
exports.applyItemDefaults = (item) => {
    const copy = util_1.deepCopy(ItemDefaults);
    return {
        ...copy,
        ...item
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zdG9yZS91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUFrQztBQUdsQyxNQUFNLFlBQVksR0FBUztJQUN6QixFQUFFLEVBQUUsRUFBRTtJQUNOLElBQUksRUFBRSxFQUFFO0lBQ1IsV0FBVyxFQUFFLEVBQUU7SUFDZixLQUFLLEVBQUUsR0FBRztJQUNWLFdBQVcsRUFBRSxFQUFFO0lBQ2YsSUFBSSxFQUFFLE1BQU07SUFDWixZQUFZLEVBQUUsRUFBRTtDQUNqQixDQUFBO0FBQ1ksUUFBQSxpQkFBaUIsR0FBRyxDQUFDLElBQVUsRUFBUSxFQUFFO0lBQ3BELE1BQU0sSUFBSSxHQUFHLGVBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVuQyxPQUFPO1FBQ0wsR0FBRyxJQUFJO1FBQ1AsR0FBRyxJQUFJO0tBQ1IsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuL3R5cGVzJ1xuXG5jb25zdCBJdGVtRGVmYXVsdHM6IEl0ZW0gPSB7XG4gIGlkOiAnJyxcbiAgbmFtZTogJycsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgcHJpY2U6IDEwMCxcbiAgcmVzb3VyY2VVcmw6ICcnLFxuICB0eXBlOiAnZm9udCcsXG4gIHJlc291cmNlTmFtZTogJydcbn1cbmV4cG9ydCBjb25zdCBhcHBseUl0ZW1EZWZhdWx0cyA9IChpdGVtOiBJdGVtKTogSXRlbSA9PiB7XG4gIGNvbnN0IGNvcHkgPSBkZWVwQ29weShJdGVtRGVmYXVsdHMpXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb3B5LFxuICAgIC4uLml0ZW1cbiAgfVxufVxuIl19