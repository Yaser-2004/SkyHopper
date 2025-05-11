
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Download, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FlightCard from '@/components/FlightCard';
import { useAppContext } from '@/context/AppContext';
import html2pdf from 'html2pdf.js';
import { PulseLoader } from 'react-spinners';
import Footer from '@/components/Footer';

const BookingPage = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const { selectedFlight, user, bookFlight } = useAppContext();
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const ticketRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFlight) {
      navigate('/');
    }
    console.log("Selected Flight:", selectedFlight);
    
  }, [selectedFlight, navigate]);

  if (!selectedFlight) {
    return null;
  }

  const handleConfirmBooking = () => {
    const success = bookFlight(selectedFlight);
    if (success) {
      setIsBookingComplete(true);
    }

    console.log("selected flight-------------------------->", selectedFlight);
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
  };

  const handleBackToFlights = () => {
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-500"
          onClick={handleBackToFlights}
        >
          <ArrowLeft size={16} className="mr-1" /> Back to flights
        </Button>

        {!isBookingComplete ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Confirm Your Booking</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Flight Details</h2>
              <FlightCard flight={selectedFlight} showBookButton={false} />
              
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">Price Breakdown</h2>
                <div className="flex justify-between mb-2">
                  <span>Base Fare</span>
                  <span>₹{(selectedFlight.currentPrice * 0.8).toFixed(0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes & Fees</span>
                  <span>₹{(selectedFlight.currentPrice * 0.2).toFixed(0)}</span>
                </div>
                <div className="border-t border-dashed my-2"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{selectedFlight.currentPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
              
              <div className="flex justify-between mb-4">
                <span>Current Wallet Balance</span>
                <span className="font-semibold">₹{user?.wallet?.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-lg">
                <span>Balance After Booking</span>
                <span className={`font-bold ${user?.wallet < selectedFlight.price ? 'text-red-600' : 'text-green-600'}`}>
                  ₹{Math.max(0, user?.wallet - selectedFlight.price).toLocaleString()}
                </span>
              </div>
              
              {user?.wallet < selectedFlight.price && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                  Insufficient wallet balance. Please add funds to continue.
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleConfirmBooking} 
                disabled={user?.wallet < selectedFlight.price}
                className="bg-skyhopper-primary hover:bg-green-600 text-white"
                size="lg"
              >
                Confirm Booking
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div ref={ticketRef} className='text-center'>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">Your flight has been booked successfully.</p>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium max-sm:text-sm">{selectedFlight.airline} {selectedFlight.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium max-sm:text-sm">May 8, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium max-sm:text-sm">{selectedFlight.departureCity} ({selectedFlight.departureCityCode})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium max-sm:text-sm">{selectedFlight.arrivalCity} ({selectedFlight.arrivalCityCode})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure Time</p>
                    <p className="font-medium max-sm:text-sm">{selectedFlight.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival Time</p>
                    <p className="font-medium max-sm:text-sm">{selectedFlight.arrivalTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownloadTicket}
                className="bg-skyhopper-secondary hover:bg-blue-700"
              >
                <Download size={16} className="mr-2" /> Download E-Ticket
              </Button>
              <Button 
                onClick={handleViewBookings}
                variant="outline"
                className="border-skyhopper-primary text-skyhopper-primary"
              >
                View My Bookings
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
