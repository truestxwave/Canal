import React from "react";

type Ticket = {
  ticketNumber: number;
  projectId: number;
  Requester: string;
  description: string;
  status: string;
};

interface TicketDropdownProps {
  tickets: Ticket[];
  onSelect: (ticket: Ticket | null) => void;
}

const TicketDropdown: React.FC<TicketDropdownProps> = ({ tickets, onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Ticket | null>(null);

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selected ? `#${selected.ticketNumber} ${selected.Requester}` : "Select a ticket"}
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow max-h-60 overflow-y-auto">
          {tickets.length === 0 ? (
            <li className="p-2 text-gray-500 dark:text-gray-300">No tickets available</li>
          ) : (
            tickets.map((ticket) => (
              <li
                key={ticket.ticketNumber}
                className="p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600"
                onClick={() => {
                  setSelected(ticket);
                  onSelect(ticket);
                  setOpen(false);
                }}
              >
                #{ticket.ticketNumber} {ticket.Requester} - {ticket.description}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TicketDropdown;
