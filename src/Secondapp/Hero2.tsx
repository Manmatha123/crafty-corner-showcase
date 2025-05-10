
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import banner from "../../public/pexels-jadson-thomas-164235-542556.jpg"

const Hero = () => {

  const navigate=useNavigate();
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMCA1MmMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMC04YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLTQ0YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0xNiAxNmMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMC04YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLTE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDUyYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLThjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bS04LTQwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLTQ4YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0tOCA4YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLThjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtLTMyLTMyYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLThjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtLTgtMjRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMTZjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtLTgtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMC04YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLThNMTIgNmMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtMC04YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wIDE2YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0wLThjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAgMzJjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTQiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-craft-900 leading-tight">
              Handcrafted with <span className="text-craft-600">Love</span> & Passion
            </h1>
            <p className="text-lg md:text-xl text-craft-800 max-w-lg">
              Discover unique handmade treasures created by talented artisans from around the country.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button  size="lg" className="bg-black hover:bg-craft-700 text-white"  onClick={() => navigate('/filter')}>
                Shop Now
              </Button>
            </div>
          </div>
          
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden animate-scale-in">
            <img 
              src={banner} 
              alt="Handcrafted items display" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2skwkDuGUloICGT0fkcA5QTn1IM5BLU9ePm7H2_-FcMBvbCeYEI1jeG7a2pSc2UudKY&usqp=CAU';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-craft-900/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg max-w-xs">
              <p className="font-medium text-craft-800">
                "Every piece tells a unique story of creativity and craftsmanship."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
