import React, { useState, useEffect, useRef } from 'react';
import { popularCities } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { getAmadeusToken } from '@/getToken';
import { useAppContext } from '@/context/AppContext';
import { PulseLoader } from 'react-spinners';

interface City {
  cityName: string;
  cityCode: string;
  name: string;
}

interface CitySearchProps {
  id: string;
  label: string;
  placeholder: string;
  selectedCity: City | null;
  onChange: (city: City | null) => void;
  type: 'departure' | 'arrival';
}

const CitySearch = ({ id, label, placeholder, selectedCity, onChange, type }: CitySearchProps) => {  //onchange parameters me tha
  const {
    setDepartureCityCodeInput,
    setArrivalCityCodeInput,
    setDepartureCityInput,
    setArrivalCityInput,

    token,
    setToken,
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiCities, setApiCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suppressFetch = useRef(false);

  const trimmedSearch = searchTerm.trim().toLowerCase();
  const filteredCities =
    trimmedSearch === ''
      ? popularCities
      : [
          ...popularCities.filter(
            (city) =>
              city.cityName.toLowerCase().includes(trimmedSearch) ||
              city.cityCode.toLowerCase().includes(trimmedSearch)
          ),
          ...apiCities.filter(
            (apiCity) =>
              !popularCities.some((popCity) => popCity.cityCode === apiCity.cityCode) &&
              (apiCity.cityName.toLowerCase().includes(trimmedSearch) ||
                apiCity.cityCode.toLowerCase().includes(trimmedSearch))
          ),
        ];

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (suppressFetch.current) {
        suppressFetch.current = false;
        return;
      }
      if (trimmed.length >= 2) {
        fetchCities(trimmed);
      } else {
        setApiCities([]);
      }
    }, 800);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const fetchCities = async (term: string) => {
    console.log('Fetching cities for term:', term);
    setLoading(true);
    try {
      let currentToken = token;

      // Only fetch a new token if not already available
      if (!currentToken) {
        currentToken = await getAmadeusToken();
        setToken(currentToken);
      }

      const response = await axios.get(
        'https://test.api.amadeus.com/v1/reference-data/locations',
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
          params: {
            keyword: term,
            subType: 'AIRPORT',
            'page[limit]': 10,
            sort: 'analytics.travelers.score',
          },
        }
      );

      const normalizedData: City[] = response.data.data.map((city) => ({
        cityCode: city.address.cityCode,
        cityName: city.address.cityName || city.name,
        name: city.name,
      }));

      setApiCities(normalizedData);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleCitySelect = (city: City) => {
    // onChange(city);
    suppressFetch.current = true;
    setSearchTerm(`${city.cityName} - ${city.cityCode}`);

    if (type === 'departure') {
      setDepartureCityInput(city.cityName);
      setDepartureCityCodeInput(city.cityCode);
    } else {
      setArrivalCityInput(city.cityName);
      setArrivalCityCodeInput(city.cityCode);
    }

    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // if (value === '') {
    //   onChange(null);
    //   if (type === 'departure') {
    //     setDepartureCityInput('');
    //     setDepartureCityCodeInput('');
    //   } else {
    //     setArrivalCityInput('');
    //     setArrivalCityCodeInput('');
    //   }
    // }
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        id={id}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        className="w-full h-12"
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? 
              <div className='w-full h-12 flex items-center justify-center'><PulseLoader size={6} color='blue' className='mx-auto' /></div>
          : 
            <ul className="py-1">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li
                    key={city.cityCode + city.name}
                    className="px-4 py-2 max-sm:text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{city.cityName}</span>
                      <span className="text-gray-500">{city.cityCode}</span>
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {city.cityName + ' - ' + city.name}
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No cities found</li>
              )}
            </ul>
          }
        </div>
      )}
    </div>
  );
};

export default CitySearch;
