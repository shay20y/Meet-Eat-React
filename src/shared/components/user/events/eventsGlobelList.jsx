import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EventsGlobelList(props) {
  const nav = useNavigate()
  const arr = props.arr;
  return (
    <div className="relative overflow-x-auto  sm:rounded-lg py-7">
      <div className="w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          {arr.length > 0 ? (
            <table className="w-full text-sm text-left text-black  table-auto min-w-full divide-y divide-gray-200">
              <thead className="text-xs uppercase bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                  >
                    Place
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                  >
                    Max Of Participant
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                  >
                    see Participants
                  </th>
                </tr>
              </thead>
              <tbody>
                {arr.map((item, i) => {
                  return (
                    <tr
                      key={item.event_id + i+1}
                      className="bg-t-white border-b  hover:bg-gray-50 "
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 font-medium whitespace-nowrap "
                      >
                        {item.title}
                      </th>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                        {item.city}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                        {item.description.substring(0, 30)}..
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                        {item.max_paticipants}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                        <button
                          onClick={() => {
                            nav('/ManagePaticipants/' + item.event_id +"?host=1");
                          }}
                          className="bg-main hover:bg-btn-hover  font-bold py-1 px-2 rounded"
                        >
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </div>
  )
}
