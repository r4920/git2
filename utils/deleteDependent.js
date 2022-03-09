/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter0355 = { 'updatedBy': { '$in': user } };
      const Blog5489 = await deleteBlog(BlogFilter0355);
      const BlogFilter0369 = { 'addedBy': { '$in': user } };
      const Blog2189 = await deleteBlog(BlogFilter0369);
      const userFilter3179 = { 'addedBy': { '$in': user } };
      const user0302 = await deleteUser(userFilter3179);
      const userFilter1546 = { 'updatedBy': { '$in': user } };
      const user3569 = await deleteUser(userFilter1546);
      const userTokensFilter2039 = { 'userId': { '$in': user } };
      const userTokens2186 = await deleteUserTokens(userTokensFilter2039);
      const userTokensFilter5654 = { 'addedBy': { '$in': user } };
      const userTokens1905 = await deleteUserTokens(userTokensFilter5654);
      const userTokensFilter4260 = { 'updatedBy': { '$in': user } };
      const userTokens2809 = await deleteUserTokens(userTokensFilter4260);
      const roleFilter2489 = { 'addedBy': { '$in': user } };
      const role6314 = await deleteRole(roleFilter2489);
      const roleFilter4404 = { 'updatedBy': { '$in': user } };
      const role9743 = await deleteRole(roleFilter4404);
      const projectRouteFilter2181 = { 'addedBy': { '$in': user } };
      const projectRoute5428 = await deleteProjectRoute(projectRouteFilter2181);
      const projectRouteFilter3775 = { 'updatedBy': { '$in': user } };
      const projectRoute9543 = await deleteProjectRoute(projectRouteFilter3775);
      const routeRoleFilter7882 = { 'addedBy': { '$in': user } };
      const routeRole6600 = await deleteRouteRole(routeRoleFilter7882);
      const routeRoleFilter7957 = { 'updatedBy': { '$in': user } };
      const routeRole7630 = await deleteRouteRole(routeRoleFilter7957);
      const userRoleFilter0641 = { 'userId': { '$in': user } };
      const userRole7067 = await deleteUserRole(userRoleFilter0641);
      const userRoleFilter0136 = { 'addedBy': { '$in': user } };
      const userRole9829 = await deleteUserRole(userRoleFilter0136);
      const userRoleFilter6486 = { 'updatedBy': { '$in': user } };
      const userRole6282 = await deleteUserRole(userRoleFilter6486);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter3646 = { 'roleId': { '$in': role } };
      const routeRole1056 = await deleteRouteRole(routeRoleFilter3646);
      const userRoleFilter2612 = { 'roleId': { '$in': role } };
      const userRole3751 = await deleteUserRole(userRoleFilter2612);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3945 = { 'routeId': { '$in': projectroute } };
      const routeRole9816 = await deleteRouteRole(routeRoleFilter3945);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter7673 = { 'updatedBy': { '$in': user } };
      const Blog2494 = await softDeleteBlog(BlogFilter7673, updateBody);
      const BlogFilter3784 = { 'addedBy': { '$in': user } };
      const Blog1139 = await softDeleteBlog(BlogFilter3784, updateBody);
      const userFilter8944 = { 'addedBy': { '$in': user } };
      const user3006 = await softDeleteUser(userFilter8944, updateBody);
      const userFilter3753 = { 'updatedBy': { '$in': user } };
      const user9957 = await softDeleteUser(userFilter3753, updateBody);
      const userTokensFilter4806 = { 'userId': { '$in': user } };
      const userTokens5807 = await softDeleteUserTokens(userTokensFilter4806, updateBody);
      const userTokensFilter6306 = { 'addedBy': { '$in': user } };
      const userTokens1755 = await softDeleteUserTokens(userTokensFilter6306, updateBody);
      const userTokensFilter0498 = { 'updatedBy': { '$in': user } };
      const userTokens8488 = await softDeleteUserTokens(userTokensFilter0498, updateBody);
      const roleFilter6858 = { 'addedBy': { '$in': user } };
      const role7417 = await softDeleteRole(roleFilter6858, updateBody);
      const roleFilter8362 = { 'updatedBy': { '$in': user } };
      const role9766 = await softDeleteRole(roleFilter8362, updateBody);
      const projectRouteFilter1860 = { 'addedBy': { '$in': user } };
      const projectRoute6293 = await softDeleteProjectRoute(projectRouteFilter1860, updateBody);
      const projectRouteFilter5028 = { 'updatedBy': { '$in': user } };
      const projectRoute5764 = await softDeleteProjectRoute(projectRouteFilter5028, updateBody);
      const routeRoleFilter3825 = { 'addedBy': { '$in': user } };
      const routeRole9694 = await softDeleteRouteRole(routeRoleFilter3825, updateBody);
      const routeRoleFilter8998 = { 'updatedBy': { '$in': user } };
      const routeRole5499 = await softDeleteRouteRole(routeRoleFilter8998, updateBody);
      const userRoleFilter4354 = { 'userId': { '$in': user } };
      const userRole5526 = await softDeleteUserRole(userRoleFilter4354, updateBody);
      const userRoleFilter0003 = { 'addedBy': { '$in': user } };
      const userRole9645 = await softDeleteUserRole(userRoleFilter0003, updateBody);
      const userRoleFilter4367 = { 'updatedBy': { '$in': user } };
      const userRole6185 = await softDeleteUserRole(userRoleFilter4367, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9538 = { 'roleId': { '$in': role } };
      const routeRole8506 = await softDeleteRouteRole(routeRoleFilter9538, updateBody);
      const userRoleFilter6832 = { 'roleId': { '$in': role } };
      const userRole8930 = await softDeleteUserRole(userRoleFilter6832, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5522 = { 'routeId': { '$in': projectroute } };
      const routeRole1216 = await softDeleteRouteRole(routeRoleFilter5522, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
