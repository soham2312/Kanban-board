import React, { useMemo } from 'react';
import Display from './Display';
import '../App.css';

function Dashboard({ users, tickets, selectedGrouping, selectedOrdering }) {
  const groupedAndSortedTickets = useMemo(() => {
    const groupedTickets = {};

    const sortTickets = (a, b) => {
      if (selectedOrdering === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    };

    tickets.forEach((ticket) => {
      const groupKey =
        selectedGrouping === 'user'
          ? ticket.userId
          : selectedGrouping === 'priority'
            ? ticket.priority
            : ticket.status;
      if (selectedGrouping === 'status') {
        if (!groupedTickets['Backlog'])
          groupedTickets['Backlog'] = [];
        if (!groupedTickets['Todo'])
          groupedTickets['Todo'] = [];
        if (!groupedTickets['In progress'])
          groupedTickets['In progress'] = [];
        if (!groupedTickets['Done'])
          groupedTickets['Done'] = [];
        if (!groupedTickets['Canceled'])
          groupedTickets['Canceled'] = [];
      }
      groupedTickets[groupKey] = groupedTickets[groupKey] || [];
      groupedTickets[groupKey].push(ticket);

    });

    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort(sortTickets);
    });


    console.log(groupedTickets)
    return groupedTickets;

  }, [tickets, selectedGrouping, selectedOrdering]);

  return (
    <div className="dash-board">
      {Object.keys(groupedAndSortedTickets).map((key) => (
        <Display
          key={key}
          title={key}
          tickets={groupedAndSortedTickets[key]}
          users={users}
          selectedGrouping={selectedGrouping}
        />
      ))}
    </div>
  );
}

export default Dashboard;