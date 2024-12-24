// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// TestTimeline.js
import React, { useEffect, useRef ,useState } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import testData from '../data/td.json';
import eventsData from '../data/Political_events.json';

function TestTimeline() {
  const timelineRef = useRef(null);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const container = timelineRef.current;
    container.innerHTML = '';
    const options = {
      width: '100%',
      height: '400px',
      margin: { item: 10 },
      selectable: true,
      tooltip: {
        followMouse: true,
        overflowMethod: 'flip'
      },
    };

    const timeline = new Timeline(container, testData.timeline, options);

// Handle event selection
timeline.on('select', (event) => {
  const selectedEventId = event.items[0]; // Get selected event ID
  const selectedEvent = eventsData.find((event) => event.id === selectedEventId);

  // If event details found, set the details; otherwise, set "No description"
  if (selectedEvent) {
    setEventDetails({ description: selectedEvent.description,});
  } else {
    setEventDetails({ description: 'No description available' });
  }
});


    return () => {
      timeline.destroy();  // Destroy the timeline instance to prevent memory leaks
    };
    // // Optional event listener for testing interactions
    // timeline.on('select', (event) => {
    //   console.log('Selected event:', event.items);
    // });
  }, []);

  return (
    <div>
      <h2>Timeline Test</h2>
      <div ref={timelineRef} style={{ border: '1px solid #ddd', margin: '20px 0' }}></div>
    {/* </div>

 <div> */}
 <h3>Event Details</h3>
 <p><strong>Description:</strong> {eventDetails?.description}</p>
</div>
  


  );
}

export default TestTimeline;
