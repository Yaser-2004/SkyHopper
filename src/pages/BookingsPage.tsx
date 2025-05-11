
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { airlineLogos } from '../../public/logos/airlineLogos.ts';
import html2pdf from 'html2pdf.js';
import Footer from '@/components/Footer.tsx';

const BookingsPage = () => {
  // const { getBookings } = useAppContext();
  // const bookings = getBookings();
  const [bookings, setBookings] = useState([]);
  const ticketRef = useRef();

  useEffect(() => {
    // Fetch bookings when the component mounts
    fetchUserBookings();
  }, [])

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BASEURL}/api/user`);
      console.log("---------------->",response);
      setBookings(response.data.bookings || []); 
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };
  

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF
    const element = ticketRef.current;
    const opt = {
      margin:       0.5,
      filename:     'e-ticket.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
    alert('Ticket download initiated!');
    alert('Ticket download initiated!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div ref={ticketRef} key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                    <div className='flex gap-2 items-end'>
                      <img
                        src={airlineLogos[booking.airline]}
                        alt={`${booking.airline} logo`}
                        className="h-10 w-auto mr-2"
                      />
                      <div>
                        <h3 className="text-lg max-sm:text-base font-semibold mt-2">
                          {booking.departureCity} to {booking.arrivalCity}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Booked on { new Date(booking.bookingTime).toLocaleDateString('en-GB', {
                                                                                                  day: '2-digit',
                                                                                                  month: 'short',
                                                                                                  year: 'numeric',
                                                                                                  hour: '2-digit',
                                                                                                  minute: '2-digit',
                                                                                                  hour12: false,
                                                                                                })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="text-xl font-bold text-gray-900">
                      ₹{booking.amountPaid}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {booking.airline}{/*  • {booking.flightNumber} */}
                    </div>
                    <Button 
                      onClick={handleDownloadTicket}
                      className="bg-skyhopper-secondary hover:bg-blue-700"
                      size="sm"
                    >
                      <Download size={16} className="mr-2" /> E-Ticket
                    </Button>
                  </div>
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{booking.departureTime}</div>
                      <div className="text-sm">{booking.departureCityCode}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Arrival</div>
                      <div className="font-medium">{booking.arrivalTime}</div>
                      <div className="text-sm">{booking.arrivalCityCode}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">{booking.duration}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Stops</div>
                      <div className="font-medium">
                        {booking.stops === 0
                          ? 'Non-stop'
                          : `${booking.stops} ${booking.stops === 1 ? 'stop' : 'stops'}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">You haven't made any flight bookings yet.</p>
            <Link to="/">
              <Button className="bg-skyhopper-primary hover:bg-orange-600 text-white">
                Search Flights
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingsPage;
