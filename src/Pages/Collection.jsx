import React, { useState, useEffect } from 'react';
import { Filter, Search, ShoppingCart, Star, Heart, X, CheckCircle, TrendingUp, Zap, Award, Package } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Collection = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    'All',
    'Treadmills',
    'Exercise Bikes',
    'Rowing Machines',
    'Ellipticals',
    'Weight Benches',
    'Dumbbells',
    'Resistance Bands',
    'Yoga Mats',
    'Gym Bags'
  ];

  const products = [
    // Treadmills (10 products)
    {
      id: 'tm1',
      name: 'NordicTrack Commercial 1750',
      price: 125999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Treadmills',
      description: 'Commercial grade treadmill with 22" touchscreen and iFit compatibility',
      stock: 8,
      hasSize: false,
      features: ['3.75 CHP Motor', '22" HD Touchscreen', 'iFit Compatible', '15% Incline', 'Decline Feature']
    },
    {
      id: 'tm2',
      name: 'ProForm Pro 2000 Smart',
      price: 81999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Treadmills',
      description: 'Smart treadmill with powerful motor and interactive training',
      stock: 12,
      hasSize: false,
      features: ['3.5 CHP Motor', '10" HD Display', 'AutoAdjust', '12% Incline', 'Cushioned Deck']
    },
    {
      id: 'tm3',
      name: 'Sole Fitness F85 Folding',
      price: 114999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Treadmills',
      description: 'Heavy-duty folding treadmill with superior cushioning system',
      stock: 10,
      hasSize: false,
      features: ['4.0 HP Motor', 'Cushion Flex Deck', '10.1" Touchscreen', '15% Incline', 'Bluetooth Audio']
    },
    {
      id: 'tm4',
      name: 'Life Fitness F3 Track',
      price: 159999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Treadmills',
      description: 'Premium treadmill with commercial-grade components',
      stock: 6,
      hasSize: false,
      features: ['3.5 HP AC Motor', 'FlexDeck System', '15" Console', 'Heart Rate Control', 'Track Connect']
    },
    {
      id: 'tm5',
      name: 'Horizon Fitness 7.0 AT',
      price: 68999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Treadmills',
      description: 'Advanced treadmill with quick-dial controls and bluetooth',
      stock: 15,
      hasSize: false,
      features: ['3.0 CHP Motor', 'Quick Dial Controls', 'Bluetooth Speakers', '15% Incline', 'Folding Design']
    },
    {
      id: 'tm6',
      name: 'Bowflex BXT216 MaxTrainer',
      price: 95999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Treadmills',
      description: 'Hybrid cardio machine combining treadmill and climber',
      stock: 9,
      hasSize: false,
      features: ['Max Interval Training', 'Dual Display', '16 Resistance Levels', 'Burn Rate Display', 'Compact Design']
    },
    {
      id: 'tm7',
      name: 'Precor TRM 425 Precision',
      price: 179999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Treadmills',
      description: 'Club-quality treadmill with Ground Effects technology',
      stock: 5,
      hasSize: false,
      features: ['Ground Effects', 'P30 Console', '15% Incline', 'Integrated Footplant', 'Premium Cushioning']
    },
    {
      id: 'tm8',
      name: 'Matrix TF50 Performance',
      price: 142999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Treadmills',
      description: 'Performance treadmill with XIR console and virtual training',
      stock: 11,
      hasSize: false,
      features: ['XIR Console', 'Virtual Active', '15% Incline', 'Ultimate Deck System', 'Sprint 8 Program']
    },
    {
      id: 'tm9',
      name: 'Spirit XT485 Professional',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Treadmills',
      description: 'Professional grade treadmill with extensive workout programs',
      stock: 13,
      hasSize: false,
      features: ['3.0 HP Motor', '12 Programs', '15% Incline', 'Orthopedic Belt', 'Heart Rate Monitoring']
    },
    {
      id: 'tm10',
      name: 'Landice L8 LTD Elite',
      price: 219999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 5.0,
      category: 'Treadmills',
      description: 'Ultimate luxury treadmill with lifetime warranty',
      stock: 4,
      hasSize: false,
      features: ['4.0 HP Motor', 'Cardio Control Panel', '15% Incline', 'VFX Suspension', 'Lifetime Warranty']
    },

    // Exercise Bikes (10 products)
    {
      id: 'eb1',
      name: 'Peloton Bike+ Premium',
      price: 184999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Exercise Bikes',
      description: 'Premium smart bike with rotating HD touchscreen',
      stock: 7,
      hasSize: false,
      features: ['24" Rotating Screen', 'Auto Resistance', 'Live Classes', 'Apple GymKit', 'Dolby Atmos']
    },
    {
      id: 'eb2',
      name: 'Schwinn IC4 Indoor Cycling',
      price: 62999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Exercise Bikes',
      description: 'Interactive indoor cycling bike with app connectivity',
      stock: 14,
      hasSize: false,
      features: ['100 Resistance Levels', 'Dual Pedals', 'LCD Console', 'Bluetooth Sync', 'Media Rack']
    },
    {
      id: 'eb3',
      name: 'NordicTrack S22i Studio',
      price: 124999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Exercise Bikes',
      description: 'Studio bike with immersive 22" HD touchscreen',
      stock: 9,
      hasSize: false,
      features: ['22" HD Touchscreen', 'iFit Compatible', 'Incline/Decline', '24 Resistance Levels', 'AutoAdjust']
    },
    {
      id: 'eb4',
      name: 'Bowflex C6 Smart Bike',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Exercise Bikes',
      description: 'Smart bike compatible with multiple fitness apps',
      stock: 16,
      hasSize: false,
      features: ['100 Resistance Levels', 'JRNY App', 'Dual Pedals', 'Bluetooth', 'Backlit Display']
    },
    {
      id: 'eb5',
      name: 'Life Fitness IC7 Indoor',
      price: 149999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Exercise Bikes',
      description: 'Commercial indoor cycle with coach by color technology',
      stock: 8,
      hasSize: false,
      features: ['Coach By Color', 'Self-Powered', 'WattRate Display', 'SPD Pedals', 'Contact HR']
    },
    {
      id: 'eb6',
      name: 'Keiser M3i Indoor Bike',
      price: 134999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Exercise Bikes',
      description: 'Premium magnetic resistance bike with bluetooth',
      stock: 10,
      hasSize: false,
      features: ['Magnetic Resistance', 'Bluetooth 4.0', 'V-Shape Frame', 'Adjustable Seat', 'Whisper Quiet']
    },
    {
      id: 'eb7',
      name: 'Echelon EX-5S Connect',
      price: 71999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Exercise Bikes',
      description: 'Connected bike with live and on-demand classes',
      stock: 18,
      hasSize: false,
      features: ['32 Resistance Levels', '21.5" Screen', 'Live Classes', 'Belt Drive', 'Device Holder']
    },
    {
      id: 'eb8',
      name: 'ProForm Studio Bike Pro',
      price: 79999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Exercise Bikes',
      description: 'Studio quality bike with rotating HD display',
      stock: 12,
      hasSize: false,
      features: ['22" Rotating Display', 'iFit Coach', '24 Resistance Levels', 'Ergonomic Seat', 'Dual Pedals']
    },
    {
      id: 'eb9',
      name: 'Sole SB900 Premium',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Exercise Bikes',
      description: 'Premium spin bike with heavy flywheel',
      stock: 11,
      hasSize: false,
      features: ['48lb Flywheel', 'Adjustable Resistance', 'LCD Display', 'SPD Pedals', 'Water Bottle Holder']
    },
    {
      id: 'eb10',
      name: 'Yosuda Indoor Cycling',
      price: 32999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Exercise Bikes',
      description: 'Budget-friendly indoor cycling bike with solid build',
      stock: 25,
      hasSize: false,
      features: ['35lb Flywheel', 'Adjustable Seat', 'LCD Monitor', 'iPad Holder', 'Quiet Belt Drive']
    },

    // Rowing Machines (10 products)
    {
      id: 'rm1',
      name: 'Concept2 Model D Rower',
      price: 87999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Rowing Machines',
      description: 'Industry standard rowing machine used by professionals worldwide',
      stock: 12,
      hasSize: false,
      features: ['PM5 Monitor', 'Air Resistance', 'Vertical Storage', 'Adjustable Footrests', 'Ergonomic Handle']
    },
    {
      id: 'rm2',
      name: 'WaterRower Natural Oak',
      price: 119999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Rowing Machines',
      description: 'Beautiful water resistance rower handcrafted from oak',
      stock: 8,
      hasSize: false,
      features: ['Water Resistance', 'S4 Monitor', 'Ash Wood', 'Self-Regulating', 'Upright Storage']
    },
    {
      id: 'rm3',
      name: 'NordicTrack RW900 Smart',
      price: 94999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Rowing Machines',
      description: 'Smart rowing machine with interactive HD touchscreen',
      stock: 10,
      hasSize: false,
      features: ['22" HD Touchscreen', '26 Resistance Levels', 'iFit Compatible', 'Foldable', 'Silent Magnetic']
    },
    {
      id: 'rm4',
      name: 'Hydrow Wave Connected',
      price: 149999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Rowing Machines',
      description: 'Connected rower with immersive on-water experience',
      stock: 6,
      hasSize: false,
      features: ['16" HD Screen', 'Live Outdoor Reality', 'Electromagnetic Drag', 'Compact Design', 'Bluetooth Audio']
    },
    {
      id: 'rm5',
      name: 'Ergatta Rower Cherry',
      price: 129999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Rowing Machines',
      description: 'Game-based water rower with beautiful wood finish',
      stock: 9,
      hasSize: false,
      features: ['Water Resistance', '17.3" Touchscreen', 'Game-Based Workouts', 'Cherry Wood', 'Vertical Storage']
    },
    {
      id: 'rm6',
      name: 'Stamina BodyTrac Glider',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.3,
      category: 'Rowing Machines',
      description: 'Affordable hydraulic resistance rowing machine',
      stock: 20,
      hasSize: false,
      features: ['Hydraulic Resistance', 'LCD Monitor', 'Compact Fold', 'Textured Footplates', 'Padded Seat']
    },
    {
      id: 'rm7',
      name: 'Life Fitness Row HX',
      price: 109999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Rowing Machines',
      description: 'Premium rowing machine with smooth resistance',
      stock: 11,
      hasSize: false,
      features: ['Magnetic Resistance', 'Track Connect', '20 Levels', 'Foldable', 'Advanced Monitor']
    },
    {
      id: 'rm8',
      name: 'Sunny Health SF-RW5515',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Rowing Machines',
      description: 'Magnetic rowing machine with 8 levels of resistance',
      stock: 17,
      hasSize: false,
      features: ['8 Resistance Levels', 'LCD Display', 'Soft Grip Handle', 'Adjustable Pedals', 'Built-in Wheels']
    },
    {
      id: 'rm9',
      name: 'First Degree Fitness Apollo',
      price: 159999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Rowing Machines',
      description: 'Commercial water resistance rower with advanced monitoring',
      stock: 7,
      hasSize: false,
      features: ['Fluid Resistance', 'Adjustable Resistance', 'Performance Monitor', 'Adjustable Footboard', 'Commercial Grade']
    },
    {
      id: 'rm10',
      name: 'BodyCraft VR500 Pro',
      price: 74999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Rowing Machines',
      description: 'Professional air resistance rowing machine',
      stock: 13,
      hasSize: false,
      features: ['Air Resistance', 'Performance Monitor', 'Foldable', 'Adjustable Footrests', 'Aluminum Rail']
    },

    // Ellipticals (10 products)
    {
      id: 'el1',
      name: 'Precor EFX 885 Commercial',
      price: 134999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Ellipticals',
      description: 'Premium commercial elliptical with CrossRamp technology',
      stock: 6,
      hasSize: false,
      features: ['CrossRamp', 'P30 Console', '20 Resistance Levels', 'Heart Rate Monitoring', 'Commercial Grade']
    },
    {
      id: 'el2',
      name: 'Sole E35 Elliptical',
      price: 77999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Ellipticals',
      description: 'Front-drive elliptical with power incline',
      stock: 11,
      hasSize: false,
      features: ['20 Resistance Levels', 'Power Incline', '7.5" LCD', 'Bluetooth Audio', 'Heart Rate']
    },
    {
      id: 'el3',
      name: 'NordicTrack FS14i FreeStride',
      price: 149999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Ellipticals',
      description: 'Innovative trainer combining elliptical, stepper, and treadmill',
      stock: 8,
      hasSize: false,
      features: ['14" HD Touchscreen', 'iFit Compatible', '26 Resistance Levels', 'Adjustable Stride', 'Incline/Decline']
    },
    {
      id: 'el4',
      name: 'Bowflex Max Trainer M9',
      price: 119999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Ellipticals',
      description: 'Compact cardio machine with maximum calorie burn',
      stock: 9,
      hasSize: false,
      features: ['20 Resistance Levels', 'Max Interval', '10" Touchscreen', 'JRNY App', 'Bluetooth']
    },
    {
      id: 'el5',
      name: 'Life Fitness E1 Go',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Ellipticals',
      description: 'Space-efficient elliptical with WhisperStride technology',
      stock: 14,
      hasSize: false,
      features: ['20 Resistance Levels', 'WhisperStride', 'Track Connect', 'Contact HR', 'Compact Design']
    },
    {
      id: 'el6',
      name: 'Horizon Fitness 7.8 AE',
      price: 64999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Ellipticals',
      description: 'Advanced elliptical with Bluetooth connectivity',
      stock: 16,
      hasSize: false,
      features: ['25 Resistance Levels', 'Bluetooth', '8 Programs', 'Speakers', 'USB Charging']
    },
    {
      id: 'el7',
      name: 'ProForm Carbon E7',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Ellipticals',
      description: 'Budget-friendly elliptical with smart features',
      stock: 19,
      hasSize: false,
      features: ['18 Resistance Levels', '5" Display', 'iFit Enabled', 'SpaceSaver', 'EKG Grip Pulse']
    },
    {
      id: 'el8',
      name: 'Schwinn 470 Elliptical',
      price: 59999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Ellipticals',
      description: 'Feature-rich elliptical with dual track display',
      stock: 15,
      hasSize: false,
      features: ['25 Resistance Levels', 'Dual Track Display', '29 Programs', 'Bluetooth', 'Media Shelf']
    },
    {
      id: 'el9',
      name: 'Nautilus E618 Elliptical',
      price: 69999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Ellipticals',
      description: 'Premium home elliptical with extensive programs',
      stock: 12,
      hasSize: false,
      features: ['25 Resistance Levels', 'DualTrack Display', '29 Programs', 'Bluetooth Audio', 'USB Charging']
    },
    {
      id: 'el10',
      name: 'Teeter FreeStep LT3',
      price: 44999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Ellipticals',
      description: 'Zero-impact recumbent cross trainer',
      stock: 18,
      hasSize: false,
      features: ['Zero Impact', 'Recumbent Design', '13 Resistance Levels', 'Whisper Quiet', 'Compact']
    },

    // Weight Benches (10 products)
    {
      id: 'wb1',
      name: 'Bowflex 5.1S Stowable Bench',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Weight Benches',
      description: 'Adjustable bench with 6 positions and leg hold-down',
      stock: 15,
      hasSize: false,
      features: ['6 Positions', '480kg Capacity', 'Leg Hold-Down', 'Stowable Design', 'Removable Leg Attachment']
    },
    {
      id: 'wb2',
      name: 'REP Fitness AB-3000 FID',
      price: 42999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Weight Benches',
      description: 'Heavy-duty adjustable bench with ladder adjustment',
      stock: 12,
      hasSize: false,
      features: ['7 Back Positions', '545kg Capacity', 'Decline Position', 'Wide Base', 'Premium Padding']
    },
    {
      id: 'wb3',
      name: 'Rogue Monster Utility Bench',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Weight Benches',
      description: 'Commercial-grade flat bench built like a tank',
      stock: 8,
      hasSize: false,
      features: ['545kg Capacity', '3" Padding', 'Commercial Grade', 'Powder Coated', 'Extra Wide']
    },
    {
      id: 'wb4',
      name: 'Ironmaster Super Bench',
      price: 47999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Weight Benches',
      description: 'Versatile adjustable bench with attachment system',
      stock: 10,
      hasSize: false,
      features: ['11 Positions', '454kg Capacity', 'Crunch Attachment', 'Compact Storage', 'Quick Adjust']
    },
    {
      id: 'wb5',
      name: 'Fitness Reality 2000 Super Max',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Weight Benches',
      description: 'Olympic bench with independent squat rack',
      stock: 18,
      hasSize: false,
      features: ['363kg Capacity', 'Squat Rack', '6 Back Positions', 'Leg Developer', 'Preacher Pad']
    },
    {
      id: 'wb6',
      name: 'Marcy Diamond Elite',
      price: 29999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Weight Benches',
      description: 'Olympic bench with squat rack and leg developer',
      stock: 16,
      hasSize: false,
      features: ['272kg Capacity', 'Squat Rack', 'Leg Developer', 'Adjustable Safety', 'Preacher Curl']
    },
    {
      id: 'wb7',
      name: 'Valor Fitness BF-47',
      price: 22999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Weight Benches',
      description: 'Independent Olympic bench with spotter deck',
      stock: 20,
      hasSize: false,
      features: ['5 Positions', 'Spotter Deck', 'Leg Developer', 'Weight Storage', '340kg Capacity']
    },
    {
      id: 'wb8',
      name: 'Titan Fitness Adjustable FID',
      price: 31999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Weight Benches',
      description: 'Heavy-duty FID bench with premium features',
      stock: 14,
      hasSize: false,
      features: ['7 Positions', '454kg Capacity', 'Decline Position', 'Transport Wheels', 'Wide Pad']
    },
    {
      id: 'wb9',
      name: 'CAP Barbell FM-CS7230',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.3,
      category: 'Weight Benches',
      description: 'Complete home gym bench with multiple attachments',
      stock: 22,
      hasSize: false,
      features: ['Multi-Position', 'Leg Developer', 'Preacher Curl', 'Butterfly Arms', '136kg Capacity']
    },
    {
      id: 'wb10',
      name: 'Body-Solid GFID31 FID Bench',
      price: 38999,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Weight Benches',
      description: 'Professional quality adjustable bench',
      stock: 11,
      hasSize: false,
      features: ['6 Positions', '454kg Capacity', 'DuraFirm Padding', 'Ladder Adjustment', 'Commercial Grade']
    },

    // Dumbbells (10 products)
    {
      id: 'db1',
      name: 'Bowflex SelectTech 552',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Dumbbells',
      description: 'Adjustable dumbbells replacing 15 sets (2.5kg to 24kg)',
      stock: 20,
      hasSize: false,
      features: ['15 Weight Settings', '2.5-24kg per Dumbbell', 'Quick Adjust', 'Space Saving', 'App Integration']
    },
    {
      id: 'db2',
      name: 'PowerBlock Elite Series',
      price: 44999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Dumbbells',
      description: 'Compact adjustable dumbbells with expandable design',
      stock: 15,
      hasSize: false,
      features: ['2.3-22.7kg per Hand', 'Compact Design', 'Expandable', 'Quick Change', 'Durable Steel']
    },
    {
      id: 'db3',
      name: 'Ironmaster Quick-Lock',
      price: 52999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Dumbbells',
      description: 'Premium adjustable dumbbells with quick-lock system',
      stock: 12,
      hasSize: false,
      features: ['2.3-34kg per Dumbbell', 'Quick-Lock System', 'Lifetime Warranty', 'Expandable', 'Chrome Handle']
    },
    {
      id: 'db4',
      name: 'NordicTrack Select-A-Weight 55',
      price: 35999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Dumbbells',
      description: 'iFit-enabled adjustable dumbbells with app tracking',
      stock: 18,
      hasSize: false,
      features: ['15 Weight Settings', '4.5-25kg', 'iFit Compatible', 'Quick Adjust', 'Ergonomic Handle']
    },
    {
      id: 'db5',
      name: 'CAP Barbell Rubber Hex Set',
      price: 28999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Dumbbells',
      description: 'Complete rubber hex dumbbell set (2.5kg-25kg)',
      stock: 10,
      hasSize: false,
      features: ['Complete Set', 'Rubber Coated', 'Hex Design', 'Knurled Handle', 'With Rack']
    },
    {
      id: 'db6',
      name: 'Rogue Rubber Hex Dumbbells',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Dumbbells',
      description: 'Commercial-grade rubber hex dumbbells',
      stock: 14,
      hasSize: false,
      features: ['Commercial Quality', 'Rubber Coated', 'Straight Handle', 'Anti-Roll', '5kg-50kg Available']
    },
    {
      id: 'db7',
      name: 'Yes4All Adjustable Dumbbells',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Dumbbells',
      description: 'Budget-friendly cast iron adjustable dumbbells',
      stock: 25,
      hasSize: false,
      features: ['Cast Iron', 'Adjustable Weight', 'Textured Handle', 'Star-Lock Collars', '9-18kg']
    },
    {
      id: 'db8',
      name: 'Core Fitness Adjustable 24kg',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Dumbbells',
      description: 'Quick-adjust dumbbells with dial system',
      stock: 22,
      hasSize: false,
      features: ['Dial System', '2.3-24kg', 'Space Saving', 'Safety Lock', 'Compact Stand']
    },
    {
      id: 'db9',
      name: 'Ativafit Adjustable 71.5kg Set',
      price: 32999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Dumbbells',
      description: 'Heavy-duty adjustable dumbbell and barbell set',
      stock: 16,
      hasSize: false,
      features: ['71.5kg Total', 'Dumbbell + Barbell', 'Safety Lock', 'Connecting Rod', 'Plastic Coated']
    },
    {
      id: 'db10',
      name: 'Nuobell Adjustable Dumbbells',
      price: 59999,
      image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Dumbbells',
      description: 'Premium Swedish-designed adjustable dumbbells',
      stock: 8,
      hasSize: false,
      features: ['Twist & Lock', '2-32kg', 'Premium Design', 'Compact', 'Swedish Engineering']
    },

    // Resistance Bands (10 products)
    {
      id: 'rb1',
      name: 'TheraBand Professional Set',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Resistance Bands',
      description: 'Professional latex resistance bands - complete set',
      stock: 40,
      hasSize: false,
      features: ['6 Resistance Levels', 'Professional Grade', 'Latex Material', 'Door Anchor', 'Carry Bag']
    },
    {
      id: 'rb2',
      name: 'Fit Simplify Resistance Loop',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Resistance Bands',
      description: 'Exercise loop bands set of 5 with carry bag',
      stock: 50,
      hasSize: false,
      features: ['5 Band Set', 'Loop Design', 'Natural Latex', 'Instructional Guide', 'Portable']
    },
    {
      id: 'rb3',
      name: 'Rogue Monster Bands',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Resistance Bands',
      description: 'Heavy-duty pull-up assistance bands',
      stock: 30,
      hasSize: false,
      features: ['Multiple Resistances', 'Pull-Up Training', 'Powerlifting', 'Durable Latex', 'Commercial Grade']
    },
    {
      id: 'rb4',
      name: 'Black Mountain Products Set',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Resistance Bands',
      description: 'Complete resistance band set with accessories',
      stock: 35,
      hasSize: false,
      features: ['5 Stackable Bands', 'Door Anchor', 'Ankle Strap', 'Handles', 'Carry Bag']
    },
    {
      id: 'rb5',
      name: 'Undersun Fitness Bands',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Resistance Bands',
      description: 'Premium resistance bands with lifetime guarantee',
      stock: 25,
      hasSize: false,
      features: ['5 Band Set', 'Lifetime Guarantee', 'Training Program', 'Premium Quality', 'Door Anchor']
    },
    {
      id: 'rb6',
      name: 'Whatafit Resistance Bands Set',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Resistance Bands',
      description: '11-piece resistance band set for full body workout',
      stock: 45,
      hasSize: false,
      features: ['11 Pieces', 'Stackable Bands', 'Foam Handles', 'Door Anchor', 'Ankle Straps']
    },
    {
      id: 'rb7',
      name: 'Perform Better Mini Bands',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Resistance Bands',
      description: 'Professional mini resistance band set',
      stock: 55,
      hasSize: false,
      features: ['4 Resistance Levels', 'Mini Loop Design', 'Professional Quality', 'Compact', 'Durable']
    },
    {
      id: 'rb8',
      name: 'WODFitters Pull Up Bands',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Resistance Bands',
      description: 'Stretch resistance bands for CrossFit training',
      stock: 32,
      hasSize: false,
      features: ['Multiple Resistances', 'Pull-Up Assist', 'Powerlifting', 'Mobility Work', 'Stretch Bands']
    },
    {
      id: 'rb9',
      name: 'Serious Steel Assisted Bands',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Resistance Bands',
      description: 'Premium fitness bands for serious athletes',
      stock: 28,
      hasSize: false,
      features: ['Heavy Resistance', 'Pull-Up Training', 'Stretching', '41" Length', 'Premium Latex']
    },
    {
      id: 'rb10',
      name: 'Bodylastics Stackable Set',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Resistance Bands',
      description: 'Professional stackable resistance band system',
      stock: 22,
      hasSize: false,
      features: ['14 Piece Set', 'Stackable to 68kg', 'Patented Clips', 'Door Anchor', 'Ankle Straps']
    },

    // Yoga Mats (10 products)
    {
      id: 'ym1',
      name: 'Manduka PRO Yoga Mat',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Yoga Mats',
      description: 'Professional-grade yoga mat with lifetime guarantee',
      stock: 25,
      hasSize: false,
      features: ['6mm Thick', 'Lifetime Guarantee', 'Closed-Cell Surface', 'High Density', 'Superior Grip']
    },
    {
      id: 'ym2',
      name: 'Liforme Original Yoga Mat',
      price: 11999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Yoga Mats',
      description: 'Award-winning mat with AlignForMe system',
      stock: 20,
      hasSize: false,
      features: ['4.2mm Thick', 'AlignForMe', 'Planet-Friendly', 'Grip Technology', 'Extra Wide']
    },
    {
      id: 'ym3',
      name: 'Jade Harmony Professional',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Yoga Mats',
      description: 'Natural rubber yoga mat made in USA',
      stock: 30,
      hasSize: false,
      features: ['5mm Thick', 'Natural Rubber', 'Made in USA', 'Excellent Grip', 'Eco-Friendly']
    },
    {
      id: 'ym4',
      name: 'Gaiam Premium Yoga Mat',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Yoga Mats',
      description: 'Extra thick non-slip exercise mat',
      stock: 40,
      hasSize: false,
      features: ['6mm Thick', 'Non-Slip Surface', 'Moisture Resistant', 'Carrying Strap', 'Multiple Designs']
    },
    {
      id: 'ym5',
      name: 'Lululemon The Mat 5mm',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Yoga Mats',
      description: 'Premium mat with superior grip when wet',
      stock: 28,
      hasSize: false,
      features: ['5mm Thick', 'Antimicrobial', 'Grippy When Wet', 'Latex-Free', 'Premium Quality']
    },
    {
      id: 'ym6',
      name: 'Yoloha Cork Yoga Mat',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Yoga Mats',
      description: 'Sustainable cork and rubber yoga mat',
      stock: 22,
      hasSize: false,
      features: ['Cork Surface', 'Natural Rubber', 'Antimicrobial', 'Eco-Friendly', 'Better With Age']
    },
    {
      id: 'ym7',
      name: 'Prana E.C.O. Yoga Mat',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Yoga Mats',
      description: 'Eco-friendly mat made from TPE material',
      stock: 35,
      hasSize: false,
      features: ['5mm Thick', 'TPE Material', 'Recyclable', 'Textured Surface', 'Lightweight']
    },
    {
      id: 'ym8',
      name: 'Alo Yoga Warrior Mat',
      price: 10999,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Yoga Mats',
      description: 'Luxury yoga mat with superior performance',
      stock: 18,
      hasSize: false,
      features: ['4mm Thick', 'Dry-Grip Technology', 'Antimicrobial', 'Premium PU', 'Designer Prints']
    },
    {
      id: 'ym9',
      name: 'Hugger Mugger Para Rubber',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Yoga Mats',
      description: 'Classic sticky yoga mat in various colors',
      stock: 38,
      hasSize: false,
      features: ['6.35mm Thick', 'Sticky Rubber', 'Great Cushion', 'Multiple Colors', 'Durable']
    },
    {
      id: 'ym10',
      name: 'Gorilla Mats Premium',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      rating: 4.4,
      category: 'Yoga Mats',
      description: 'Extra large extra thick exercise mat',
      stock: 45,
      hasSize: false,
      features: ['7mm Thick', 'Extra Large', 'High Density', 'Carrying Strap', 'Non-Slip']
    },

    // Gym Bags (10 products)
    {
      id: 'gb1',
      name: 'Under Armour Undeniable 4.0',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Gym Bags',
      description: 'Durable duffle bag with water-resistant finish',
      stock: 30,
      hasSize: false,
      features: ['Water-Resistant', 'Multiple Pockets', 'Adjustable Strap', 'Ventilated Pocket', 'Durable Material']
    },
    {
      id: 'gb2',
      name: 'Nike Brasilia Training Duffel',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Gym Bags',
      description: 'Spacious training bag with multiple compartments',
      stock: 35,
      hasSize: false,
      features: ['Large Capacity', 'Side Pockets', 'Padded Straps', 'Zippered Pocket', 'Durable Polyester']
    },
    {
      id: 'gb3',
      name: 'Adidas Defender 4 Duffel',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Gym Bags',
      description: 'Versatile duffel with LoadSpring shoulder straps',
      stock: 28,
      hasSize: false,
      features: ['LoadSpring Straps', 'Ventilated Pocket', 'Multiple Sizes', 'Durable', 'Easy Access']
    },
    {
      id: 'gb4',
      name: 'King Kong Backpack 2.0',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Gym Bags',
      description: 'Heavy-duty gym backpack with meal prep system',
      stock: 20,
      hasSize: false,
      features: ['Meal Prep Included', 'Shoe Compartment', 'Water Resistant', 'Multiple Pockets', 'Lifetime Warranty']
    },
    {
      id: 'gb5',
      name: 'Puma Evercat Contender',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Gym Bags',
      description: 'Budget-friendly duffel with plenty of storage',
      stock: 42,
      hasSize: false,
      features: ['Evercat Warranty', 'Large Main Compartment', 'Side Pockets', 'Adjustable Strap', 'Durable']
    },
    {
      id: 'gb6',
      name: 'The North Face Base Camp',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Gym Bags',
      description: 'Ultra-durable duffel made from recycled materials',
      stock: 18,
      hasSize: false,
      features: ['Recycled Materials', 'Water Resistant', 'Padded Straps', 'Multiple Sizes', 'Lifetime Guarantee']
    },
    {
      id: 'gb7',
      name: 'Carhartt Legacy Gear Bag',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Gym Bags',
      description: 'Rugged canvas duffel built to last',
      stock: 25,
      hasSize: false,
      features: ['Legacy Canvas', 'Multiple Pockets', 'Rain Defender', 'Adjustable Strap', 'Heavy-Duty Zippers']
    },
    {
      id: 'gb8',
      name: 'Lululemon City Sweat Duffel',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Gym Bags',
      description: 'Premium gym bag with water-repellent fabric',
      stock: 22,
      hasSize: false,
      features: ['Water-Repellent', 'Shoe Pocket', 'Laptop Sleeve', 'Multiple Compartments', 'Premium Design']
    },
    {
      id: 'gb9',
      name: 'Venum Trainer Lite Sport',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Gym Bags',
      description: 'Compact sports bag perfect for MMA and boxing',
      stock: 32,
      hasSize: false,
      features: ['Compact Design', 'Ventilated Pocket', 'Water-Repellent', 'Adjustable Strap', 'Lightweight']
    },
    {
      id: 'gb10',
      name: 'Gym Shark Lifestyle Holdall',
      price: 7499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Gym Bags',
      description: 'Stylish gym bag with premium features',
      stock: 24,
      hasSize: false,
      features: ['Premium Material', 'Shoe Compartment', 'Laptop Pocket', 'Water Bottle Holder', 'Stylish Design']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      toast.info('Removed from favorites', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setFavorites([...favorites, productId]);
      toast.success('Added to favorites! ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToCart = (product) => {
    if (product.hasSize) {
      setSelectedProduct(product);
      setSelectedSize('');
    } else {
      onAddToCart(product);
      toast.success(`${product.name} added to cart! `, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct && selectedSize) {
      const productWithSize = {
        ...selectedProduct,
        selectedSize,
        selectedGender: selectedProduct.gender,
        id: `${selectedProduct.id}-${selectedSize}-${selectedProduct.gender}`
      };
      onAddToCart(productWithSize);
      toast.success(`${selectedProduct.name} (${selectedSize}) added to cart! `, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSelectedProduct(null);
      setSelectedSize('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#097969]/5 mt-[4rem] sm:mt-[5rem] py-6 sm:py-12">
      <ToastContainer />
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Animated Header */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#097969] mb-2 sm:mb-4 tracking-tight animate-fade-in-up">
              Premium Collection
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#097969]/10 rounded-full blur-3xl animate-pulse"></div>
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-[#097969] to-transparent rounded-full animate-slide-right"></div>
              <Zap className="text-[#097969] animate-bounce" size={24} />
            </div>
            <p className="text-gray-600 text-base sm:text-xl font-medium flex items-center gap-2">
              <Award className="text-[#097969]" size={20} />
              Discover elite gym equipment for your fitness journey
            </p>
          </div>
        </div>

        {/* Animated Search and Filter Section */}
        <div className={`mb-6 sm:mb-10 space-y-4 sm:space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search Bar with Animation */}
          <div className="relative max-w-3xl group">
            <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-[#097969] transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-5 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#097969] focus:shadow-lg focus:shadow-[#097969]/20 transition-all duration-300 text-sm sm:text-lg font-medium hover:border-[#097969]/50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#097969]/5 to-transparent rounded-xl sm:rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </div>

          {/* Animated Categories Filter */}
          <div className="relative">
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 animate-fade-in-up hover:scale-105 active:scale-95 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#097969] to-[#0a8a75] text-white shadow-lg shadow-[#097969]/30 scale-105 ring-2 ring-[#097969]/20'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#097969]/30 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Products Count */}
          <div className="flex items-center gap-2 sm:gap-3 animate-slide-right">
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#097969] to-transparent rounded-full animate-pulse"></div>
            <TrendingUp className="text-[#097969] animate-bounce" size={20} />
            <p className="text-gray-700 text-sm sm:text-lg font-semibold">
              Showing <span className="text-[#097969] font-black text-lg sm:text-2xl animate-pulse">{filteredProducts.length}</span> premium products
            </p>
            <Package className="text-[#097969] ml-2" size={20} />
          </div>
        </div>

        {/* Animated Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#097969] transition-all duration-500 hover:shadow-2xl hover:shadow-[#097969]/20 group animate-fade-in-up hover:-translate-y-2 active:scale-95"
            >
              {/* Product Image with Overlay Animation */}
              <div className="relative overflow-hidden h-40 sm:h-56 md:h-72 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:rotate-1"
                />
                
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Category Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-[#097969] to-[#0a8a75] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-slide-down">
                  {product.category}
                </div>

                {/* Stock Badge with Animation */}
                {product.stock < 15 && (
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg animate-pulse-slow">
                    ⚡ Only {product.stock} left!
                  </div>
                )}

                {/* Favorite Button with Animation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-90 group/fav"
                >
                  <Heart 
                    size={18} 
                    className={`sm:w-5 sm:h-5 transition-all duration-300 group-hover/fav:scale-110 ${
                      favorites.includes(product.id) 
                        ? 'fill-red-500 text-red-500 animate-heart-beat' 
                        : 'text-gray-400 group-hover/fav:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info with Animations */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-xl font-black text-gray-900 mb-1 sm:mb-2 line-clamp-1 group-hover:text-[#097969] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Animated Rating */}
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`sm:w-4 sm:h-4 transition-all duration-300 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400 animate-twinkle' 
                            : 'text-gray-300'
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-xs sm:text-sm font-bold">({product.rating})</span>
                </div>

                {/* Animated Features */}
                {product.features && (
                  <div className="mb-3 sm:mb-5 hidden sm:block">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key Features</p>
                    <div className="space-y-1.5">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-2 group/feature"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#097969] rounded-full flex-shrink-0 group-hover/feature:scale-150 transition-transform duration-300"></div>
                          <span className="text-xs text-gray-700 font-medium group-hover/feature:text-[#097969] transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Animated Price and Add to Cart */}
                <div className="mt-3 sm:mt-6 pt-3 sm:pt-5 border-t-2 border-gray-100">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <p className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#097969] to-[#0a8a75] animate-gradient">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold mt-0.5 sm:mt-1 flex items-center gap-1">
                        <Package size={12} />
                        Stock: {product.stock} units
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-[#097969] to-[#0a8a75] hover:from-[#086758] hover:to-[#097969] text-white px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#097969]/30 font-bold text-xs sm:text-base group/btn transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart size={16} className="sm:w-5 sm:h-5 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline">{product.hasSize ? 'Select Size & Add' : 'Add to Cart'}</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-32 animate-fade-in">
            <div className="h-32 w-32 sm:h-40 sm:w-40 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-gray-300 animate-pulse">
              <Filter className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 animate-bounce" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-4">No products found</h3>
            <p className="text-gray-600 text-base sm:text-xl font-medium">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Size Selection Modal (if needed) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-gray-200 animate-scale-up">
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base font-semibold">{selectedProduct.gender}'s {selectedProduct.category}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-900 transition-all duration-300 p-2 sm:p-3 hover:bg-gray-100 rounded-xl hover:rotate-90 active:scale-90"
              >
                <X size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-60 sm:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#097969]/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Product Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Price */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-[#097969] transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Price</p>
                  <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#097969] to-[#0a8a75]">
                    ₹{selectedProduct.price.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-2 sm:mt-3 flex items-center gap-2">
                    <Package size={16} />
                    Stock: {selectedProduct.stock} units available
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">Customer Rating</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`sm:w-5 sm:h-5 transition-all duration-300 hover:scale-125 ${
                            i < Math.floor(selectedProduct.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-900 text-base sm:text-lg font-black">({selectedProduct.rating})</span>
                  </div>
                </div>

                {/* Features */}
                {selectedProduct.features && (
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">Key Features</p>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-700 font-medium text-sm sm:text-base group/item hover:text-[#097969] transition-colors duration-300">
                          <CheckCircle size={18} className="sm:w-5 sm:h-5 text-[#097969] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Size Selection */}
            {selectedProduct.hasSize && (
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-[#097969] to-[#0a8a75] rounded-full animate-pulse"></div>
                  Select Your Size
                </h4>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-base sm:text-lg transition-all duration-300 border-2 transform hover:scale-105 active:scale-95 ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-[#097969] to-[#0a8a75] text-white border-[#097969] shadow-lg shadow-[#097969]/30 scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#097969] hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6 sm:mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-[#097969] transition-all duration-300">
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Description</p>
              <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">{selectedProduct.description}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={confirmAddToCart}
              disabled={selectedProduct.hasSize && !selectedSize}
              className={`w-full py-4 sm:py-5 rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                (!selectedProduct.hasSize || selectedSize)
                  ? 'bg-gradient-to-r from-[#097969] to-[#0a8a75] hover:from-[#086758] hover:to-[#097969] text-white shadow-xl hover:shadow-2xl hover:shadow-[#097969]/30'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
              {(!selectedProduct.hasSize || selectedSize) ? 'Add to Cart' : 'Please Select a Size'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-right {
          animation: slide-right 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 1s ease-in-out infinite;
        }

        .animate-heart-beat {
          animation: heart-beat 0.6s ease-in-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};