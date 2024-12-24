

import { useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AdminPannel = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/order")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  // delete method
  const handleDelete = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "Deleting orders won't be reversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/order/${_id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                swalWithBootstrapButtons.fire({
                  title: "Order deleted successfully",
                  icon: "success",
                });
                setOrder((prevOrders) =>
                  prevOrders.filter((order) => order._id !== _id)
                );
              }
            })
            .catch((error) => {
              console.error("Error deleting:", error);
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was an issue deleting the file.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
          });
        }
      });
  };

  // Approve method
  const updatedStatus = { status: "approved" };

  const handleApprove = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "Approving this order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Approve",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/order/${_id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedStatus),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                swalWithBootstrapButtons.fire({
                  title: "Order approved successfully...",
                  icon: "success",
                });

                
                setOrder((prevOrders) =>
                  prevOrders.map((order) =>
                    order._id === _id ? { ...order, status: "approved" } : order
                  )
                );
              }
            })
            .catch((error) => {
              console.error("Error approving:", error);
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was an issue approving the order.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3">Image</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
              {order.map((orders) => (
                <tr key={orders._id}>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900">
                    <img className="lg:w-28 lg:h-24 " src={orders.image} />
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 font-bold">
                    {orders.title}
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 font-bold">
                    $ {orders.price}
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 font-bold">
                    {orders.status !== "approved" ? (
                      <div className="dropdown dropdown-left">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn m-1 bg-yellow-500 text-white border-none" 
                        >
                          {orders.status}
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-6  text-center shadow"
                        >
                          <li>
                            <button
                            className="bg-green-500 text-white lg:ml-4  hover:text-green-500"
                              onClick={() => handleApprove(orders._id)}
                            >
                              Approve
                            </button>
                          </li>
                          
                        </ul>
                      </div>
                    ) : (
                      <span className="text-green-600 font-bold">Approved</span>
                    )}
                  </td>
                  <td className="px-3 py-2 shadow-lg shadow-blue-900 lg:text-2xl ">
                    <button
                    className="text-red-600 font-bold text-xl"
                     onClick={() => handleDelete(orders._id)}>
                      <IoTrashBinOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;

