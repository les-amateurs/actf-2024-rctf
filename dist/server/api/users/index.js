"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note that the order of exports is important.
exports.default = [
    /*
     /users/members/* routes must come before /users/:id
     or else it will be interpreted as an id
    */
    ...require('./members').default,
    require('./me').default,
    require('./id').default,
    require('./update').default,
    ...require('./me-auth/ctftime').default,
    ...require('./me-auth/email').default
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL3VzZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBQy9DLGtCQUFlO0lBQ2I7OztNQUdFO0lBQ0YsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTztJQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTztJQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTztJQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztJQUMzQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU87SUFDdkMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPO0NBQ3RDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIGV4cG9ydHMgaXMgaW1wb3J0YW50LlxuZXhwb3J0IGRlZmF1bHQgW1xuICAvKlxuICAgL3VzZXJzL21lbWJlcnMvKiByb3V0ZXMgbXVzdCBjb21lIGJlZm9yZSAvdXNlcnMvOmlkXG4gICBvciBlbHNlIGl0IHdpbGwgYmUgaW50ZXJwcmV0ZWQgYXMgYW4gaWRcbiAgKi9cbiAgLi4ucmVxdWlyZSgnLi9tZW1iZXJzJykuZGVmYXVsdCxcbiAgcmVxdWlyZSgnLi9tZScpLmRlZmF1bHQsXG4gIHJlcXVpcmUoJy4vaWQnKS5kZWZhdWx0LFxuICByZXF1aXJlKCcuL3VwZGF0ZScpLmRlZmF1bHQsXG4gIC4uLnJlcXVpcmUoJy4vbWUtYXV0aC9jdGZ0aW1lJykuZGVmYXVsdCxcbiAgLi4ucmVxdWlyZSgnLi9tZS1hdXRoL2VtYWlsJykuZGVmYXVsdFxuXVxuIl19