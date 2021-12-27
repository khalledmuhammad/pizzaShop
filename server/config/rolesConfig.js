const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    /* resource is profile */
    profile: {
      //these are the actions
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    products: {
      "read:any": ["*"],
    },
    product: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    order: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    cart: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  user: {
    profile: {
      "create:own": ["*"],
      "read:own": ["*", "!password", "!date", "!_id"],
      "update:own": ["*", "!password", "!date", "!_id"],
      "delete:own": ["*"],
    },
    order: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
    cart: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};
const roles = new AccessControl(grantsObject);
module.exports = { roles };
