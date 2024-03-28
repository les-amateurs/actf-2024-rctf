"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisionAllowed = exports.allowedDivisions = exports.compileACLs = void 0;
const server_1 = __importDefault(require("../config/server"));
let acls;
const restrictionChecks = {
    domain: value => email => { var _a; return (_a = email === null || email === void 0 ? void 0 : email.endsWith('@' + value)) !== null && _a !== void 0 ? _a : false; },
    email: value => email => email === value,
    regex: value => {
        const re = new RegExp(value);
        return email => email === undefined ? false : re.test(email);
    },
    any: value => email => true // eslint-disable-line @typescript-eslint/no-unused-vars
};
exports.compileACLs = () => {
    let divisionACLs = server_1.default.divisionACLs;
    // allow everything if no ACLs or if no email verify
    if (!divisionACLs || divisionACLs.length === 0 || !server_1.default.email) {
        divisionACLs = [{
                match: 'any',
                value: '',
                divisions: Object.keys(server_1.default.divisions)
            }];
    }
    acls = divisionACLs.map(({ match, value, divisions }) => {
        if (!Object.prototype.hasOwnProperty.call(restrictionChecks, match)) {
            throw new Error(`Unrecognized ACL matcher "${match}"`);
        }
        return { check: restrictionChecks[match](value), divisions };
    });
};
exports.compileACLs();
exports.allowedDivisions = (email) => {
    for (const acl of acls) {
        if (acl.check(email)) {
            return acl.divisions;
        }
    }
    return [];
};
exports.divisionAllowed = (email, division) => {
    return exports.allowedDivisions(email).includes(division);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdHJpY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvdXRpbC9yZXN0cmljdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBdUQ7QUFldkQsSUFBSSxJQUFtQixDQUFBO0FBRXZCLE1BQU0saUJBQWlCLEdBQXlEO0lBQzlFLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLHdCQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUssb0NBQUssS0FBSyxHQUFBO0lBQy9ELEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUs7SUFDeEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUIsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBQ0QsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0RBQXdEO0NBQ3JGLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBRyxHQUFTLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUE7SUFDdEMsb0RBQW9EO0lBQ3BELElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLEtBQUssRUFBRTtRQUMvRCxZQUFZLEdBQUcsQ0FBQztnQkFDZCxLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsRUFBRTtnQkFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQzthQUN6QyxDQUFDLENBQUE7S0FDSDtJQUNELElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNuRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixLQUFLLEdBQUcsQ0FBQyxDQUFBO1NBQ3ZEO1FBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQTtJQUM5RCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELG1CQUFXLEVBQUUsQ0FBQTtBQUVBLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxLQUF5QixFQUFZLEVBQUU7SUFDdEUsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDdEIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQTtTQUNyQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUE7QUFDWCxDQUFDLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBRyxDQUFDLEtBQXlCLEVBQUUsUUFBZ0IsRUFBVyxFQUFFO0lBQ3RGLE9BQU8sd0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcsIHsgU2VydmVyQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcblxudHlwZSBBQ0xDaGVjayA9IChlbWFpbDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiBib29sZWFuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQUNMIHtcbiAgbWF0Y2g6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgZGl2aXNpb25zOiAoa2V5b2YgU2VydmVyQ29uZmlnWydkaXZpc2lvbnMnXSlbXTtcbn1cblxuaW50ZXJmYWNlIENvbXBpbGVkQUNMIHtcbiAgY2hlY2s6IEFDTENoZWNrO1xuICBkaXZpc2lvbnM6IChrZXlvZiBTZXJ2ZXJDb25maWdbJ2RpdmlzaW9ucyddKVtdO1xufVxuXG5sZXQgYWNsczogQ29tcGlsZWRBQ0xbXVxuXG5jb25zdCByZXN0cmljdGlvbkNoZWNrczogeyBbY2hlY2tUeXBlOiBzdHJpbmddOiAodmFsdWU6IHN0cmluZykgPT4gQUNMQ2hlY2sgfSA9IHtcbiAgZG9tYWluOiB2YWx1ZSA9PiBlbWFpbCA9PiBlbWFpbD8uZW5kc1dpdGgoJ0AnICsgdmFsdWUpID8/IGZhbHNlLFxuICBlbWFpbDogdmFsdWUgPT4gZW1haWwgPT4gZW1haWwgPT09IHZhbHVlLFxuICByZWdleDogdmFsdWUgPT4ge1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cCh2YWx1ZSlcbiAgICByZXR1cm4gZW1haWwgPT4gZW1haWwgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogcmUudGVzdChlbWFpbClcbiAgfSxcbiAgYW55OiB2YWx1ZSA9PiBlbWFpbCA9PiB0cnVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG59XG5cbmV4cG9ydCBjb25zdCBjb21waWxlQUNMcyA9ICgpOiB2b2lkID0+IHtcbiAgbGV0IGRpdmlzaW9uQUNMcyA9IGNvbmZpZy5kaXZpc2lvbkFDTHNcbiAgLy8gYWxsb3cgZXZlcnl0aGluZyBpZiBubyBBQ0xzIG9yIGlmIG5vIGVtYWlsIHZlcmlmeVxuICBpZiAoIWRpdmlzaW9uQUNMcyB8fCBkaXZpc2lvbkFDTHMubGVuZ3RoID09PSAwIHx8ICFjb25maWcuZW1haWwpIHtcbiAgICBkaXZpc2lvbkFDTHMgPSBbe1xuICAgICAgbWF0Y2g6ICdhbnknLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgZGl2aXNpb25zOiBPYmplY3Qua2V5cyhjb25maWcuZGl2aXNpb25zKVxuICAgIH1dXG4gIH1cbiAgYWNscyA9IGRpdmlzaW9uQUNMcy5tYXAoKHsgbWF0Y2gsIHZhbHVlLCBkaXZpc2lvbnMgfSkgPT4ge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3RyaWN0aW9uQ2hlY2tzLCBtYXRjaCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5yZWNvZ25pemVkIEFDTCBtYXRjaGVyIFwiJHttYXRjaH1cImApXG4gICAgfVxuICAgIHJldHVybiB7IGNoZWNrOiByZXN0cmljdGlvbkNoZWNrc1ttYXRjaF0odmFsdWUpLCBkaXZpc2lvbnMgfVxuICB9KVxufVxuXG5jb21waWxlQUNMcygpXG5cbmV4cG9ydCBjb25zdCBhbGxvd2VkRGl2aXNpb25zID0gKGVtYWlsOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmdbXSA9PiB7XG4gIGZvciAoY29uc3QgYWNsIG9mIGFjbHMpIHtcbiAgICBpZiAoYWNsLmNoZWNrKGVtYWlsKSkge1xuICAgICAgcmV0dXJuIGFjbC5kaXZpc2lvbnNcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdXG59XG5cbmV4cG9ydCBjb25zdCBkaXZpc2lvbkFsbG93ZWQgPSAoZW1haWw6IHN0cmluZyB8IHVuZGVmaW5lZCwgZGl2aXNpb246IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gYWxsb3dlZERpdmlzaW9ucyhlbWFpbCkuaW5jbHVkZXMoZGl2aXNpb24pXG59XG4iXX0=