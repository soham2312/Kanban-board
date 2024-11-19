import React from 'react';
import Card from './Card';
import plus from '../assets/plus.svg';
import done from '../assets/done.svg';
import no_priority from '../assets/no_priority.svg';
import low from '../assets/low.svg';
import medium from '../assets/medium.svg';
import high from '../assets/high.svg';
import urgent from '../assets/urgent_priority.svg';
import void_circle from '../assets/To-do.svg';
import dashed_circle from '../assets/Backlog.svg';
import in_progress from '../assets/in-progress.svg';
import cancel from '../assets/Cancelled.svg';
import three_dot from '../assets/three_dot.svg';
import User from './User';
import '../App.css'

function Display({ title, tickets, users, selectedGrouping }) {
  const priorityIcon = [no_priority, low, medium, high, urgent];
  const statusIcon = {
    "In progress": in_progress,
    "Todo": void_circle,
    "Done": done,
    "Backlog": dashed_circle,
    "Canceled": cancel,
  };

  const getPriorityTag = (priority) => {
    switch (priority) {
      case 0:
        return "No Priority";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      case 4:
        return "Urgent";
      default:
        return "";
    }
  };

  return (
    <div className='col'>
      <div className="col-heading">
        <div style={{ display: "flex", alignItems: "center", padding: "0px" }}>
          {selectedGrouping === 'user' ? (
            <User users={users} userId={title} selectedGrouping={selectedGrouping} />
          ) : (
            selectedGrouping === 'priority' ? (
              <>
                <img src={priorityIcon[title]} alt="Priority" style={{ marginRight: "10px" }} />
                <span style={{ fontSize: "15px" }}>{getPriorityTag(Number(title))}11</span>
              </>
            ) : (
              <>
                <img src={statusIcon[title]} alt="Status" style={{ margin: "0px" }} />
                <span style={{ marginLeft: "8px", marginRight: "8px" }}>{title}</span>

              </>
            )
          )}

          {title === 'user' && <span style={{ fontSize: "1em", marginLeft: "10px", marginRight: "10px" }}>{title}</span>}
          <span style={{ marginLeft: "4px", marginRight: "20px", position: "relative", fontSize: "15px" }}>{tickets.length}</span>
        </div>

        <div style={{ justifyContent: "space-between", marginRight: "5px" }}>
          <img src={plus} alt="Plus Icon" style={{ marginRight: "10px", width: "0.7em" }} />
          <img src={three_dot} alt="Three Dots Icon" style={{ marginRight: "10px", width: "0.7em" }} />
        </div>

      </div>

      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          ticket={ticket}
          users={users}
          selectedGrouping={selectedGrouping}
          priorityIcon={priorityIcon}
          statusIcon={statusIcon}
        />
      ))}
    </div>
  );
}

export default Display;