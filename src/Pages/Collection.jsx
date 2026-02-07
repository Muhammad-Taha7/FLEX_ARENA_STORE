import React, { useState } from 'react';
import { Filter, Search, ShoppingCart, Star, Heart, X, CheckCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Collection = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  const categories = [
    'All',
    'Track Suits Men',
    'Track Suits Women',
    'Compression Shirts',
    'Cardio Machines'
  ];

  const products = [
    // Track Suits - Men (20 products)
    {
      id: 'tsm1',
      name: 'Nike Dri-FIT Pro Track Suit',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Premium moisture-wicking track suit with ventilation zones for intense workouts',
      stock: 18,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Dri-FIT Technology', 'Breathable Mesh Panels', 'Anti-Odor Fabric', 'Elastic Waistband']
    },
    {
      id: 'tsm2',
      name: 'Adidas Essentials 3-Stripes Track Suit',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Classic 3-stripes design with comfortable cotton-blend fabric',
      stock: 25,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Cotton-Polyester Blend', 'Signature 3-Stripes', 'Ribbed Cuffs', 'Front Zip Jacket']
    },
    {
      id: 'tsm3',
      name: 'Under Armour HeatGear Track Suit',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Lightweight HeatGear fabric designed to keep you cool and dry',
      stock: 15,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['HeatGear Technology', 'UPF 30 Protection', '4-Way Stretch', 'Anti-Wick Fabric']
    },
    {
      id: 'tsm4',
      name: 'Puma T7 Vintage Track Suit',
      price: 4799,
      image: 'https://images.unsplash.com/photo-1549068106-b024baf5062d?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Retro-inspired track suit with modern comfort features',
      stock: 22,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Vintage Design', 'Brushed Back Fabric', 'Ribbed Trim', 'Full Zip Jacket']
    },
    {
      id: 'tsm5',
      name: 'Reebok Training Track Suit',
      price: 3899,
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Performance training suit with enhanced mobility features',
      stock: 30,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Flexweave Fabric', 'Ventilation Zones', 'Moisture Management', 'Athletic Fit']
    },
    {
      id: 'tsm6',
      name: 'Nike Therma-FIT Fleece Track Suit',
      price: 5299,
      image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Warm fleece track suit for cold weather training',
      stock: 20,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Therma-FIT Fleece', 'Brushed Interior', 'Wind-Resistant', 'Kangaroo Pocket']
    },
    {
      id: 'tsm7',
      name: 'Adidas Tiro 21 Training Suit',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Professional football training suit with AEROREADY technology',
      stock: 28,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['AEROREADY Technology', 'Climalite Fabric', 'Raglan Sleeves', 'Side Stripes']
    },
    {
      id: 'tsm8',
      name: 'Under Armour Rival Fleece Track Suit',
      price: 4499,
      image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Soft fleece track suit for everyday training and leisure',
      stock: 32,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Brushed Fleece', 'Ultra-Soft Fabric', 'Relaxed Fit', 'Contrast Details']
    },
    {
      id: 'tsm9',
      name: 'Puma TeamFinal Track Jacket Set',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Track Suits Men',
      description: 'Team training suit with moisture-wicking properties',
      stock: 35,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['DryCELL Technology', 'Breathable Fabric', 'Ribbed Collar', 'Side Pockets']
    },
    {
      id: 'tsm10',
      name: 'Nike Sportswear Windrunner Track Suit',
      price: 5799,
      image: 'https://images.unsplash.com/photo-1578763460786-2301c013b0e4?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Iconic Windrunner design with modern performance features',
      stock: 16,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Windrunner Design', 'Water-Resistant', 'Chevron Details', 'Lightweight']
    },
    {
      id: 'tsm11',
      name: 'Adidas Badge of Sport Track Suit',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Essential track suit with classic Adidas branding',
      stock: 40,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Classic Logo', 'French Terry Fabric', 'Regular Fit', 'Machine Washable']
    },
    {
      id: 'tsm12',
      name: 'Under Armour Storm Fleece Track Suit',
      price: 5199,
      image: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Weather-resistant track suit with Storm technology',
      stock: 18,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Storm Technology', 'Water-Repellent', 'Wind-Resistant', 'Quick-Dry']
    },
    {
      id: 'tsm13',
      name: 'Reebok Classic Track Suit',
      price: 4199,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Vintage-inspired track suit with modern comfort',
      stock: 25,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Vintage Styling', 'French Terry', 'Contrast Piping', 'Ribbed Trim']
    },
    {
      id: 'tsm14',
      name: 'Nike Club Fleece Track Suit',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Comfortable fleece track suit for everyday wear',
      stock: 38,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Club Fleece', 'Relaxed Fit', 'Front Pockets', 'Elastic Waist']
    },
    {
      id: 'tsm15',
      name: 'Adidas Own The Run Track Suit',
      price: 4899,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Running-focused track suit with reflective details',
      stock: 22,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Reflective Elements', 'Breathable Mesh', 'Running-Specific', 'Moisture-Wicking']
    },
    {
      id: 'tsm16',
      name: 'Puma x Ferrari Track Suit',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Limited edition collaboration with premium features',
      stock: 12,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Ferrari Collaboration', 'Premium Materials', 'Racing Stripes', 'Limited Edition']
    },
    {
      id: 'tsm17',
      name: 'Under Armour Charged Cotton Track Suit',
      price: 4699,
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Cotton track suit with performance-enhancing technology',
      stock: 26,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Charged Cotton', 'Moisture Transport', 'Natural Feel', 'Odor Control']
    },
    {
      id: 'tsm18',
      name: 'Nike Sportswear Tech Fleece Track Suit',
      price: 6499,
      image: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Innovative Tech Fleece for superior warmth without weight',
      stock: 14,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Tech Fleece', 'Warmth-to-Weight Ratio', 'Modern Silhouette', 'Premium Finish']
    },
    {
      id: 'tsm19',
      name: 'Adidas Marathon Track Suit',
      price: 5399,
      image: 'https://images.unsplash.com/photo-1594736797933-d00f78670c4c?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Long-distance running suit with enhanced durability',
      stock: 19,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Marathon-Tested', 'Durable Fabric', 'Chafe-Resistant', 'Multiple Pockets']
    },
    {
      id: 'tsm20',
      name: 'Puma PowerCAT Track Suit',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1551442504-5c3d8c8c38c5?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Powerful design with athletic performance features',
      stock: 33,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['PowerCAT Design', 'Athletic Fit', 'Performance Fabric', 'Strategic Ventilation']
    },

    // Track Suits - Women (20 products)
    {
      id: 'tsw1',
      name: 'Nike Victory Compression Track Suit',
      price: 5299,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Compression-fit track suit for maximum performance',
      stock: 20,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Compression Fit', 'Sculpted Design', 'Four-Way Stretch', 'Sweat-Wicking']
    },
    {
      id: 'tsw2',
      name: 'Adidas Yoga Training Track Suit',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1584467735871-8db9ac8d0916?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Flexible track suit designed for yoga and pilates',
      stock: 28,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Yoga-Focused', 'Maximum Stretch', 'Breathable Fabric', 'Seamless Construction']
    },
    {
      id: 'tsw3',
      name: 'Lululemon Align Track Suit',
      price: 6899,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Buttery-soft Nulu fabric for ultimate comfort',
      stock: 16,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Nulu Fabric', 'Naked Sensation', 'Four-Way Stretch', 'Sweat-Wicking']
    },
    {
      id: 'tsw4',
      name: 'Under Armour Women\'s HeatGear Track Suit',
      price: 4899,
      image: 'https://images.unsplash.com/photo-1591369822093-3508e6d2a4b5?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Lightweight HeatGear fabric for hot weather training',
      stock: 24,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['HeatGear Technology', 'UPF 30+', 'Mesh Ventilation', 'Anti-Odor']
    },
    {
      id: 'tsw5',
      name: 'Nike Pro Cool Training Suit',
      price: 4799,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Cooling technology for intense training sessions',
      stock: 32,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Cooling Technology', 'Dri-FIT ADV', 'Strategic Ventilation', 'Athletic Fit']
    },
    {
      id: 'tsw6',
      name: 'Adidas Stella McCartney Track Suit',
      price: 7299,
      image: 'https://images.unsplash.com/photo-1528812969535-4bcefc071532?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Fashion-forward design with performance features',
      stock: 14,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Designer Collaboration', 'Eco-Friendly Materials', 'Fashion Design', 'High Performance']
    },
    {
      id: 'tsw7',
      name: 'Puma Women\'s Training Track Suit',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Track Suits Women',
      description: 'Versatile training suit for gym and casual wear',
      stock: 36,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['DryCELL Technology', 'Breathable Fabric', 'Comfort Fit', 'Modern Design']
    },
    {
      id: 'tsw8',
      name: 'Reebok Nano Training Track Suit',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1594736797933-d00f78670c4c?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Cross-training suit designed for functional fitness',
      stock: 22,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Cross-Training Focus', 'Durable Fabric', 'Flex Zones', 'Sweat Management']
    },
    {
      id: 'tsw9',
      name: 'Under Armour Qualifier Fleece Track Suit',
      price: 4199,
      image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.6,
      category: 'Track Suits Women',
      description: 'Soft fleece track suit for cool weather training',
      stock: 30,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Brushed Fleece', 'Ultra-Soft Feel', 'Relaxed Fit', 'Everyday Comfort']
    },
    {
      id: 'tsw10',
      name: 'Nike Yoga Dri-FIT Track Suit',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Yoga-specific track suit with enhanced flexibility',
      stock: 26,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Yoga-Focused Design', 'Maximum Flexibility', 'Breathable Fabric', 'Comfort Waistband']
    },
    {
      id: 'tsw11',
      name: 'Adidas 3-Stripes Training Suit',
      price: 3699,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Classic 3-stripes design with modern fit',
      stock: 34,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Signature Stripes', 'French Terry Fabric', 'Regular Fit', 'Ribbed Details']
    },
    {
      id: 'tsw12',
      name: 'Lululemon Fast and Free Track Suit',
      price: 7499,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Lightweight suit designed for running and training',
      stock: 18,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Nulux Fabric', 'Second-Skin Fit', 'Breathable Mesh', 'Sweat-Wicking']
    },
    {
      id: 'tsw13',
      name: 'Puma Define Training Suit',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1591369822093-3508e6d2a4b5?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Body-defining fit with performance features',
      stock: 28,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Define Fit', 'Compression Fabric', 'Sculpting Design', 'Four-Way Stretch']
    },
    {
      id: 'tsw14',
      name: 'Under Armour ColdGear Track Suit',
      price: 5699,
      image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Insulated track suit for cold weather training',
      stock: 20,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['ColdGear Technology', 'Insulated Fabric', 'Wind-Resistant', 'Brushed Interior']
    },
    {
      id: 'tsw15',
      name: 'Nike One Luxe Training Suit',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1528812969535-4bcefc071532?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Premium training suit with luxurious feel',
      stock: 16,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Luxe Fabric', 'Premium Feel', 'Slim Fit', 'Sophisticated Design']
    },
    {
      id: 'tsw16',
      name: 'Adidas Training Essential Track Suit',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Track Suits Women',
      description: 'Essential track suit for everyday training',
      stock: 40,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Essential Design', 'Comfortable Fit', 'Easy Care', 'Versatile Style']
    },
    {
      id: 'tsw17',
      name: 'Under Armour PlayUp Track Suit',
      price: 3899,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Playful design with serious performance',
      stock: 32,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Playful Design', 'Performance Fabric', 'Comfort Fit', 'Youthful Style']
    },
    {
      id: 'tsw18',
      name: 'Puma Performance Training Suit',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'High-performance training suit for serious athletes',
      stock: 24,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Performance Focused', 'Technical Fabric', 'Athletic Fit', 'Enhanced Mobility']
    },
    {
      id: 'tsw19',
      name: 'Nike Victory Pro Training Suit',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1591369822093-3508e6d2a4b5?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Professional-grade training suit for elite athletes',
      stock: 18,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Elite Performance', 'Compression Fit', 'Moisture Management', 'Professional Grade']
    },
    {
      id: 'tsw20',
      name: 'Adidas Primeblue Track Suit',
      price: 5799,
      image: 'https://images.unsplash.com/photo-1528812969535-4bcefc071532?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Sustainable track suit made with recycled materials',
      stock: 22,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Primeblue Material', 'Eco-Friendly', 'Recycled Polyester', 'Sustainable Design']
    },

    // Compression Shirts (20 products)
    {
      id: 'cs1',
      name: 'Under Armour HeatGear Compression Shirt',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Lightweight compression shirt for hot weather training',
      stock: 45,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['HeatGear Fabric', 'UPF 30 Protection', '4-Way Stretch', 'Anti-Odor Technology']
    },
    {
      id: 'cs2',
      name: 'Nike Pro Elite Compression Top',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1594736797933-d00f78670c4c?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Elite compression top with Dri-FIT ADV technology',
      stock: 32,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Dri-FIT ADV', 'Strategic Ventilation', 'Body-Mapped Fit', 'Enhanced Mobility']
    },
    {
      id: 'cs3',
      name: 'Adidas Techfit Compression Shirt',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Performance compression shirt with Techfit technology',
      stock: 38,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Techfit Technology', 'Body-Adaptive Fit', 'Moisture-Wicking', 'Muscle Support']
    },
    {
      id: 'cs4',
      name: 'Under Armour ColdGear Compression Shirt',
      price: 2399,
      image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Insulated compression shirt for cold weather training',
      stock: 28,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['ColdGear Technology', 'Thermal Regulation', 'Brushed Interior', 'Wind-Resistant']
    },
    {
      id: 'cs5',
      name: 'Nike Pro Hyperwarm Compression',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Warm compression shirt with Hyperwarm technology',
      stock: 26,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Hyperwarm Technology', 'Thermal Insulation', 'Moisture Management', 'Enhanced Warmth']
    },
    {
      id: 'cs6',
      name: 'Adidas Aeroready Compression Top',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'Breathable compression top with Aeroready technology',
      stock: 42,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Aeroready Technology', 'Sweat-Wicking', 'Fast-Drying', 'Odor Control']
    },
    {
      id: 'cs7',
      name: 'Under Armour Charged Cotton Compression',
      price: 1999,
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Cotton compression shirt with performance technology',
      stock: 35,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Charged Cotton', 'Moisture Transport', 'Natural Feel', 'Odor Control']
    },
    {
      id: 'cs8',
      name: 'Nike Pro Combat Compression Shirt',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Maximum protection compression shirt',
      stock: 30,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Combat Protection', 'Impact Absorbing', 'Durable Fabric', 'Enhanced Safety']
    },
    {
      id: 'cs9',
      name: 'Adidas Alphaskin Compression',
      price: 2599,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Advanced compression technology for elite athletes',
      stock: 24,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Alphaskin Technology', 'Muscle Support', 'Enhanced Performance', 'Professional Grade']
    },
    {
      id: 'cs10',
      name: 'Under Armour RUSH Compression Top',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Mineral-infused compression for enhanced performance',
      stock: 20,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Mineral-Infused', 'Performance Enhancing', 'Recovery Support', 'Energy Return']
    },
    {
      id: 'cs11',
      name: 'Nike Pro Cool Compression',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1594736797933-d00f78670c4c?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Cooling compression shirt for intense workouts',
      stock: 36,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Cooling Technology', 'Heat Dissipation', 'Ventilation Zones', 'Quick-Dry']
    },
    {
      id: 'cs12',
      name: 'Adidas Tiro Training Compression',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'Training compression shirt with Tiro technology',
      stock: 40,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Tiro Technology', 'Training Focused', 'Comfort Fit', 'Moisture Management']
    },
    {
      id: 'cs13',
      name: 'Under Armour Iso-Chill Compression',
      price: 2699,
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Instant cooling compression technology',
      stock: 22,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Iso-Chill Technology', 'Instant Cooling', 'Temperature Regulation', 'Performance Fabric']
    },
    {
      id: 'cs14',
      name: 'Nike Pro Warm Compression',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Warm compression for cold weather training',
      stock: 32,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Warm Technology', 'Thermal Insulation', 'Moisture-Wicking', 'Cold Weather Protection']
    },
    {
      id: 'cs15',
      name: 'Adidas 4DFWD Compression Shirt',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Advanced 4D technology compression shirt',
      stock: 18,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['4D Technology', 'Advanced Compression', 'Performance Enhancing', 'Elite Level']
    },
    {
      id: 'cs16',
      name: 'Under Armour Threadborne Compression',
      price: 2399,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Threadborne fabric for ultimate comfort',
      stock: 28,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Threadborne Fabric', 'Ultimate Comfort', 'Durable Construction', 'Soft Feel']
    },
    {
      id: 'cs17',
      name: 'Nike Pro Dri-FIT Compression',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1594736797933-d00f78670c4c?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'Classic Dri-FIT compression shirt',
      stock: 44,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Dri-FIT Technology', 'Basic Compression', 'Reliable Performance', 'Everyday Training']
    },
    {
      id: 'cs18',
      name: 'Adidas Primegreen Compression',
      price: 2099,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Eco-friendly compression shirt',
      stock: 34,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Primegreen Material', 'Eco-Friendly', 'Recycled Content', 'Sustainable Performance']
    },
    {
      id: 'cs19',
      name: 'Under Armour Playoff Compression',
      price: 2499,
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Game-day compression shirt',
      stock: 26,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Game-Day Ready', 'Enhanced Support', 'Professional Grade', 'Competition Focused']
    },
    {
      id: 'cs20',
      name: 'Nike Pro Hypercool Compression',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Maximum cooling compression technology',
      stock: 22,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Hypercool Technology', 'Maximum Cooling', 'Ventilation Mesh', 'Heat Management']
    },

    // Cardio Machines (20 products)
    {
      id: 'cm1',
      name: 'NordicTrack Commercial 1750 Treadmill',
      price: 125999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Commercial grade treadmill with 22" touchscreen',
      stock: 8,
      hasSize: false,
      features: ['3.75 CHP Motor', '22" Touchscreen', 'iFit Compatibility', 'Auto Incline/Decline']
    },
    {
      id: 'cm2',
      name: 'Peloton Bike+',
      price: 184999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Premium spin bike with rotating screen',
      stock: 6,
      hasSize: false,
      features: ['24" Rotating Screen', 'Auto Resistance', 'Live Classes', 'Bluetooth Connectivity']
    },
    {
      id: 'cm3',
      name: 'Concept2 Model D Rowing Machine',
      price: 87999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Gold standard rowing machine used by professionals',
      stock: 10,
      hasSize: false,
      features: ['PM5 Performance Monitor', 'Air Resistance', 'Folds Vertically', 'Commercial Grade']
    },
    {
      id: 'cm4',
      name: 'ProForm Carbon TLX Treadmill',
      price: 75999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Foldable treadmill with smart features',
      stock: 12,
      hasSize: false,
      features: ['3.5 CHP Motor', '10" Smart HD Touchscreen', 'SpaceSaver Design', '30 Workout Apps']
    },
    {
      id: 'cm5',
      name: 'Sole Fitness F85 Treadmill',
      price: 114999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Heavy-duty treadmill for serious runners',
      stock: 7,
      hasSize: false,
      features: ['4.0 HP Motor', 'Cushion Flex Whisper Deck', '10.1" Touchscreen', '15% Incline']
    },
    {
      id: 'cm6',
      name: 'Bowflex C6 Bike',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Smart bike compatible with popular apps',
      stock: 15,
      hasSize: false,
      features: ['100 Resistance Levels', 'Bluetooth Connectivity', 'LCD Console', 'Dual Link Pedals']
    },
    {
      id: 'cm7',
      name: 'Life Fitness F3 Treadmill',
      price: 159999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Commercial treadmill used in fitness clubs',
      stock: 5,
      hasSize: false,
      features: ['3.5 HP AC Motor', 'FlexDeck Shock Absorption', '15" Console', 'Heart Rate Control']
    },
    {
      id: 'cm8',
      name: 'Schwinn IC4 Indoor Cycling Bike',
      price: 62999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Interactive indoor cycling bike',
      stock: 11,
      hasSize: false,
      features: ['100 Micro-Adjustable Resistance', 'Dual-Link Pedals', 'LCD Console', 'Bluetooth Sync']
    },
    {
      id: 'cm9',
      name: 'Precor EFX 885 Elliptical',
      price: 134999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Commercial elliptical with cross ramp',
      stock: 6,
      hasSize: false,
      features: ['20 Resistance Levels', 'Cross Ramp Technology', '10" Touchscreen', 'Heart Rate Monitoring']
    },
    {
      id: 'cm10',
      name: 'Horizon Fitness 7.0 AT Treadmill',
      price: 68999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Foldable treadmill with quick incline',
      stock: 14,
      hasSize: false,
      features: ['3.0 CHP Motor', 'Bluetooth Speakers', 'QuickDial Controls', 'Folding Design']
    },
    {
      id: 'cm11',
      name: 'ProForm Pro 2000 Treadmill',
      price: 81999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Smart treadmill with iFit compatibility',
      stock: 9,
      hasSize: false,
      features: ['3.5 CHP Motor', '10" HD Touchscreen', '0-12% Incline', 'AutoAdjust Trainer']
    },
    {
      id: 'cm12',
      name: 'Echelon Connect Sport Bike',
      price: 42999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.5,
      category: 'Cardio Machines',
      description: 'Smart bike with app connectivity',
      stock: 18,
      hasSize: false,
      features: ['32 Resistance Levels', 'Echelon Fit App', 'Tablet Holder', 'Quiet Belt Drive']
    },
    {
      id: 'cm13',
      name: 'NordicTrack RW900 Rower',
      price: 94999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Smart rower with 22" touchscreen',
      stock: 8,
      hasSize: false,
      features: ['22" Interactive Touchscreen', '26 Resistance Levels', 'iFit Compatibility', 'Foldable Design']
    },
    {
      id: 'cm14',
      name: 'Sole Fitness E35 Elliptical',
      price: 77999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Front-drive elliptical with power incline',
      stock: 10,
      hasSize: false,
      features: ['20 Resistance Levels', 'Power Incline', '7.5" LCD Display', 'Heart Rate Monitor']
    },
    {
      id: 'cm15',
      name: 'Bowflex Max Trainer M8',
      price: 104999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Hybrid cardio machine combining stepper and elliptical',
      stock: 7,
      hasSize: false,
      features: ['20 Resistance Levels', 'Dual LCD Displays', 'Heart Rate Monitor', '14" Stride']
    },
    {
      id: 'cm16',
      name: 'ProForm Studio Bike Pro 22',
      price: 71999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Studio bike with 22" touchscreen',
      stock: 13,
      hasSize: false,
      features: ['22" Rotating HD Touchscreen', 'iFit Coach', '24 Digital Resistance Levels', 'Ergonomic Design']
    },
    {
      id: 'cm17',
      name: 'Life Fitness E1 Go Elliptical',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Compact elliptical for home use',
      stock: 11,
      hasSize: false,
      features: ['20 Resistance Levels', 'Easy Start Console', 'StrideAdjust', 'Heart Rate Monitoring']
    },
    {
      id: 'cm18',
      name: 'NordicTrack Commercial Studio Cycle',
      price: 99999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Studio cycle with smart features',
      stock: 9,
      hasSize: false,
      features: ['22" Smart HD Touchscreen', 'AutoAdjust Resistance', 'iFit Compatibility', 'Silent Magnetic Resistance']
    },
    {
      id: 'cm19',
      name: 'Horizon Fitness 7.8 AE Elliptical',
      price: 64999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=800&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Advanced elliptical with Bluetooth',
      stock: 15,
      hasSize: false,
      features: ['25 Resistance Levels', 'Bluetooth Connectivity', '8 Programs', 'Heart Rate Monitor']
    },
    {
      id: 'cm20',
      name: 'Sole Fitness TT8 Treadmill',
      price: 109999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Light commercial treadmill',
      stock: 6,
      hasSize: false,
      features: ['4.0 HP Motor', '15" Touchscreen', 'Cushion Flex Whisper Deck', '15% Incline']
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
      toast.success('Added to favorites! ❤️', {
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
      toast.success(`${product.name} added to cart! 🛒`, {
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
      toast.success(`${selectedProduct.name} (${selectedSize}) added to cart! 🛒`, {
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
    <div className="min-h-screen bg-white mt-[4rem] sm:mt-[5rem] py-6 sm:py-12">
      <ToastContainer />
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#097969] mb-2 sm:mb-4 tracking-tight">
            Premium Collection
          </h1>
          <p className="text-gray-600 text-base sm:text-xl font-medium">Discover elite gym equipment for your fitness journey</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-10 space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-3xl">
            <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-5 bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#097969] focus:bg-white transition-all text-sm sm:text-lg font-medium"
            />
          </div>

          {/* Categories Filter */}
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#097969] text-white shadow-lg shadow-[#097969]/30 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-1 w-16 sm:w-20 bg-[#097969] rounded-full"></div>
            <p className="text-gray-700 text-sm sm:text-lg font-semibold">
              Showing <span className="text-[#097969] font-black text-lg sm:text-2xl">{filteredProducts.length}</span> premium products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#097969] transition-all duration-300 hover:shadow-2xl group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-40 sm:h-56 md:h-72 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-[#097969] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-lg">
                  {product.category}
                </div>
                {product.hasSize && (
                  <div className="absolute top-10 sm:top-16 left-2 sm:left-4 bg-gray-900 text-white px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                    {product.gender}
                  </div>
                )}
                {product.stock < 10 && (
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold animate-pulse shadow-lg">
                    ⚡ Only {product.stock} left!
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-xl font-black text-gray-900 mb-1 sm:mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-xs sm:text-sm font-bold">({product.rating})</span>
                </div>

                {/* Features */}
                {product.features && (
                  <div className="mb-3 sm:mb-5 hidden sm:block">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key Features</p>
                    <div className="space-y-1.5">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#097969] rounded-full flex-shrink-0"></div>
                          <span className="text-xs text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Add to Cart */}
                <div className="mt-3 sm:mt-6 pt-3 sm:pt-5 border-t-2 border-gray-100">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div>
                      <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#097969]">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold mt-0.5 sm:mt-1">Stock: {product.stock} units</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#097969] hover:bg-[#086758] text-white px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl font-bold text-xs sm:text-base group"
                  >
                    <ShoppingCart size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{product.hasSize ? 'Select Size & Add' : 'Add to Cart'}</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-32">
            <div className="h-32 w-32 sm:h-40 sm:w-40 mx-auto mb-6 sm:mb-8 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
              <Filter className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-4">No products found</h3>
            <p className="text-gray-600 text-base sm:text-xl font-medium">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Size Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-gray-200">
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base font-semibold">{selectedProduct.gender}'s {selectedProduct.category}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 sm:p-3 hover:bg-gray-100 rounded-xl"
              >
                <X size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-60 sm:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#097969] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-black uppercase tracking-wide shadow-lg">
                  {selectedProduct.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Price */}
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                  <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Price</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#097969]">₹{selectedProduct.price.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-2 sm:mt-3">Stock: {selectedProduct.stock} units available</p>
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
                          className={`sm:w-5 sm:h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-gray-700 font-medium text-sm sm:text-base">
                          <CheckCircle size={18} className="sm:w-5 sm:h-5 text-[#097969] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-6 sm:h-8 bg-[#097969] rounded-full"></div>
                Select Your Size
              </h4>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-base sm:text-lg transition-all duration-300 border-2 ${
                      selectedSize === size
                        ? 'bg-[#097969] text-white border-[#097969] shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#097969] hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Description</p>
              <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">{selectedProduct.description}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={confirmAddToCart}
              disabled={!selectedSize}
              className={`w-full py-4 sm:py-5 rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${
                selectedSize
                  ? 'bg-[#097969] hover:bg-[#086758] text-white shadow-xl hover:shadow-2xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
              {selectedSize ? 'Add to Cart' : 'Please Select a Size'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};