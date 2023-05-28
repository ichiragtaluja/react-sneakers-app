import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to order are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's order.
 * send GET Request at /api/user/order
 * */

export const getOrderItemsHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      { errors: ["The mail you entered is not registered"] }
    );
  }
  const userOrders = schema.usersfindBy({ _id: userId }).orders;
  return new Response(200, {}, { orders: userOrders });
};

export const addItemToOrdersHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userOrders = schema.users.findBy({ _id: userId }).orders;
    const order = JSON.parse(request.requestBody);
    userOrders.push({
      ...order,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      _id: uuid(),
    });
    this.db.users.update({ _id: userId }, { orders: userOrders });
    return new Response(201, {}, { orders: userOrders });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
