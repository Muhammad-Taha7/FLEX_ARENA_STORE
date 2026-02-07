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
      name: 'Premium Athletic Track Suit',
      price: 3499,
      image: 'https://www.triumph-sports.com/wp-content/uploads/2026/01/TraSui11-1.jpg',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Complete training suit with jacket and pants',
      stock: 25,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Moisture-wicking', 'Breathable fabric', 'Zippered pockets']
    },
    {
      id: 'tsm2',
      name: 'Pro Performance Track Suit',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'High-performance athletic wear',
      stock: 20,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Anti-odor', '4-way stretch', 'Quick-dry']
    },
    {
      id: 'tsm3',
      name: 'Elite Training Track Suit',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Professional grade training suit',
      stock: 30,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Thermal regulation', 'Ergonomic fit', 'Reflective details']
    },
    {
      id: 'tsm4',
      name: 'Winter Track Suit Heavy',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Warm fleece-lined track suit',
      stock: 18,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Fleece-lined', 'Wind-resistant', 'Insulated']
    },
    {
      id: 'tsm5',
      name: 'Summer Track Suit Light',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Lightweight summer training suit',
      stock: 35,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Ultra-light', 'Mesh panels', 'UV protection']
    },
    {
      id: 'tsm6',
      name: 'Classic Track Suit Black',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Timeless black track suit',
      stock: 28,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Classic design', 'Durable fabric', 'Comfortable fit']
    },
    {
      id: 'tsm7',
      name: 'Sports Track Suit Navy',
      price: 3599,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Navy blue athletic track suit',
      stock: 22,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Color-fast', 'Pre-shrunk', 'Reinforced seams']
    },
    {
      id: 'tsm8',
      name: 'Track Suit Slim Fit',
      price: 3899,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Modern slim-fit design',
      stock: 20,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Tapered fit', 'Stretchy fabric', 'Athletic cut']
    },
    {
      id: 'tsm9',
      name: 'Gym Track Suit Grey',
      price: 3199,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Track Suits Men',
      description: 'Heather grey training suit',
      stock: 32,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Soft cotton blend', 'Relaxed fit', 'Machine washable']
    },
    {
      id: 'tsm10',
      name: 'Runner Track Suit',
      price: 4199,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Designed for runners',
      stock: 24,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Ventilated', 'Lightweight', 'Reflective strips']
    },
    {
      id: 'tsm11',
      name: 'Striped Track Suit',
      price: 3699,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Classic striped design',
      stock: 26,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Contrast stripes', 'Retro style', 'Quality stitching']
    },
    {
      id: 'tsm12',
      name: 'Hooded Track Suit',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Track suit with hoodie',
      stock: 19,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Adjustable hood', 'Kangaroo pocket', 'Drawstring waist']
    },
    {
      id: 'tsm13',
      name: 'Zip-Up Track Suit',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Track Suits Men',
      description: 'Full zip track jacket and pants',
      stock: 27,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Two-way zipper', 'Side pockets', 'Elastic cuffs']
    },
    {
      id: 'tsm14',
      name: 'Tech Track Suit',
      price: 5299,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Advanced technical fabric',
      stock: 15,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Moisture management', 'Temperature control', 'Odor resistant']
    },
    {
      id: 'tsm15',
      name: 'Jogger Track Suit',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Men',
      description: 'Jogger style track pants',
      stock: 29,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Tapered ankles', 'Elastic waistband', 'Modern fit']
    },
    {
      id: 'tsm16',
      name: 'Training Track Suit Pro',
      price: 4799,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Professional training gear',
      stock: 21,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Performance fabric', 'Ergonomic design', 'Premium quality']
    },
    {
      id: 'tsm17',
      name: 'Casual Track Suit',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Track Suits Men',
      description: 'Everyday casual track suit',
      stock: 34,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Comfortable cotton', 'Relaxed style', 'Affordable']
    },
    {
      id: 'tsm18',
      name: 'Athletic Track Suit Blue',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Men',
      description: 'Royal blue athletic suit',
      stock: 23,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Vibrant color', 'Fade-resistant', 'Durable construction']
    },
    {
      id: 'tsm19',
      name: 'Track Suit Combo Set',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Men',
      description: 'Complete training combo',
      stock: 17,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Jacket + Pants + T-shirt', 'Matching set', 'Value pack']
    },
    {
      id: 'tsm20',
      name: 'Premium Track Suit Deluxe',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 5.0,
      category: 'Track Suits Men',
      description: 'Luxury athletic track suit',
      stock: 12,
      hasSize: true,
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: ['Premium materials', 'Designer finish', 'Limited edition']
    },

    // Track Suits - Women (20 products)
    {
      id: 'tsw1',
      name: 'Women\'s Fitness Track Suit',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Stylish women\'s training suit',
      stock: 28,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Feminine fit', 'Breathable', 'Flattering design']
    },
    {
      id: 'tsw2',
      name: 'Women\'s Track Suit Pink',
      price: 3599,
      image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Soft pink athletic suit',
      stock: 25,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Soft fabric', 'Pretty color', 'Comfortable']
    },
    {
      id: 'tsw3',
      name: 'Yoga Track Suit Women',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Perfect for yoga and training',
      stock: 30,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Stretchy', 'Moisture-wicking', 'Non-restrictive']
    },
    {
      id: 'tsw4',
      name: 'Women\'s Winter Track Suit',
      price: 4699,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Warm fleece track suit',
      stock: 20,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Fleece-lined', 'Cozy', 'Insulated']
    },
    {
      id: 'tsw5',
      name: 'Athletic Track Suit Purple',
      price: 3199,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Track Suits Women',
      description: 'Vibrant purple design',
      stock: 32,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Bold color', 'Athletic fit', 'Quick-dry']
    },
    {
      id: 'tsw6',
      name: 'Running Track Suit Women',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Designed for runners',
      stock: 24,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Lightweight', 'Ventilated', 'Reflective']
    },
    {
      id: 'tsw7',
      name: 'Women\'s Track Suit Black',
      price: 3399,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Classic black suit',
      stock: 27,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Timeless', 'Versatile', 'Slimming']
    },
    {
      id: 'tsw8',
      name: 'Crop Top Track Suit',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Trendy crop top style',
      stock: 22,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Modern design', 'Crop top jacket', 'High-waist pants']
    },
    {
      id: 'tsw9',
      name: 'Sports Track Suit Teal',
      price: 3699,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Beautiful teal color',
      stock: 26,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Unique shade', 'Stylish', 'Comfortable']
    },
    {
      id: 'tsw10',
      name: 'Women\'s Slim Track Suit',
      price: 3899,
      image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Slim-fit athletic wear',
      stock: 23,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Body-hugging', 'Stretchy', 'Flattering cut']
    },
    {
      id: 'tsw11',
      name: 'Hooded Track Suit Women',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Track suit with hood',
      stock: 19,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Drawstring hood', 'Thumb holes', 'Cozy']
    },
    {
      id: 'tsw12',
      name: 'Gym Track Suit Grey',
      price: 3199,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Track Suits Women',
      description: 'Heather grey gym suit',
      stock: 29,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Neutral color', 'Soft fabric', 'Easy care']
    },
    {
      id: 'tsw13',
      name: 'Zip Track Suit Women',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Full zip design',
      stock: 25,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Convenient zippers', 'Side pockets', 'Easy on/off']
    },
    {
      id: 'tsw14',
      name: 'Tech Track Suit Women',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Advanced tech fabric',
      stock: 16,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Smart fabric', 'Temperature regulation', 'Anti-microbial']
    },
    {
      id: 'tsw15',
      name: 'Casual Track Suit Women',
      price: 2899,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Track Suits Women',
      description: 'Everyday comfort suit',
      stock: 33,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Relaxed fit', 'Cotton blend', 'Affordable']
    },
    {
      id: 'tsw16',
      name: 'Women\'s Track Suit Navy',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Track Suits Women',
      description: 'Navy blue athletic suit',
      stock: 24,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Classic navy', 'Professional look', 'Durable']
    },
    {
      id: 'tsw17',
      name: 'Striped Track Suit Women',
      price: 3699,
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Retro striped design',
      stock: 21,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Side stripes', 'Vintage style', 'Trendy']
    },
    {
      id: 'tsw18',
      name: 'Training Track Suit Pro',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Track Suits Women',
      description: 'Professional training gear',
      stock: 18,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Pro quality', 'Performance fabric', 'Ergonomic']
    },
    {
      id: 'tsw19',
      name: 'Women\'s Track Suit Set',
      price: 4399,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Track Suits Women',
      description: 'Complete 3-piece set',
      stock: 20,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Jacket + Pants + Top', 'Coordinated set', 'Great value']
    },
    {
      id: 'tsw20',
      name: 'Premium Women Track Suit',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 5.0,
      category: 'Track Suits Women',
      description: 'Luxury athletic wear',
      stock: 14,
      hasSize: true,
      gender: 'Women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Designer quality', 'Premium finish', 'Exclusive']
    },

    // Compression Shirts (20 products)
    {
      id: 'cs1',
      name: 'Pro Compression Shirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'High-performance compression wear',
      stock: 30,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Moisture-wicking', 'Anti-odor', 'UV Protection']
    },
    {
      id: 'cs2',
      name: 'Athletic Compression Top',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Premium athletic compression',
      stock: 25,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Breathable fabric', '4-way stretch', 'Quick-dry']
    },
    {
      id: 'cs3',
      name: 'Muscle Fit Compression',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Enhanced muscle support',
      stock: 20,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Compression zones', 'Seamless design', 'Anti-chafe']
    },
    {
      id: 'cs4',
      name: 'Long Sleeve Compression',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'Full arm compression support',
      stock: 18,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Thumb holes', 'Flatlock seams', 'Temperature control']
    },
    {
      id: 'cs5',
      name: 'Base Layer Compression',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Perfect base layer',
      stock: 35,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Second skin fit', 'Thermal regulation', 'Lightweight']
    },
    {
      id: 'cs6',
      name: 'Tank Compression Top',
      price: 999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Compression Shirts',
      description: 'Sleeveless compression',
      stock: 28,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Maximum mobility', 'Cooling effect', 'Racerback design']
    },
    {
      id: 'cs7',
      name: 'Compression Shirt Black',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Classic black compression',
      stock: 32,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Versatile color', 'Durable', 'Professional']
    },
    {
      id: 'cs8',
      name: 'Performance Compression',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Maximum performance',
      stock: 22,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Enhanced support', 'Muscle recovery', 'Elite fabric']
    },
    {
      id: 'cs9',
      name: 'Compression Shirt White',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'Clean white design',
      stock: 26,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Stain-resistant', 'Bright white', 'Easy care']
    },
    {
      id: 'cs10',
      name: 'Camo Compression Shirt',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Camouflage pattern',
      stock: 24,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Stylish print', 'Unique design', 'Athletic fit']
    },
    {
      id: 'cs11',
      name: 'Compression Rash Guard',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Multi-sport compression',
      stock: 27,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Rash protection', 'SPF 50+', 'Chlorine resistant']
    },
    {
      id: 'cs12',
      name: 'Thermal Compression',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Cold weather compression',
      stock: 19,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Heat retention', 'Insulated', 'Winter wear']
    },
    {
      id: 'cs13',
      name: 'Compression Shirt Blue',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Royal blue compression',
      stock: 29,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Vibrant color', 'Fade-proof', 'Modern style']
    },
    {
      id: 'cs14',
      name: 'V-Neck Compression',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Compression Shirts',
      description: 'V-neck style compression',
      stock: 25,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Stylish neckline', 'Comfortable', 'Versatile']
    },
    {
      id: 'cs15',
      name: 'Compression Shirt Red',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Bold red compression',
      stock: 23,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Eye-catching', 'Motivating color', 'High quality']
    },
    {
      id: 'cs16',
      name: 'Hooded Compression Shirt',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Compression Shirts',
      description: 'Compression with hood',
      stock: 17,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Built-in hood', 'Extra coverage', 'Unique design']
    },
    {
      id: 'cs17',
      name: 'Compression Shirt Grey',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Compression Shirts',
      description: 'Heather grey compression',
      stock: 31,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Neutral tone', 'Versatile', 'Everyday wear']
    },
    {
      id: 'cs18',
      name: 'Mesh Compression Shirt',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Compression Shirts',
      description: 'Breathable mesh panels',
      stock: 21,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Ventilated', 'Cooling', 'Strategic mesh']
    },
    {
      id: 'cs19',
      name: 'Zip Compression Shirt',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Compression Shirts',
      description: 'Half-zip compression',
      stock: 20,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Adjustable zip', 'Easy ventilation', 'Practical']
    },
    {
      id: 'cs20',
      name: 'Premium Compression Elite',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      rating: 5.0,
      category: 'Compression Shirts',
      description: 'Top-tier compression wear',
      stock: 15,
      hasSize: true,
      gender: 'Unisex',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      features: ['Premium fabric', 'Elite performance', 'Professional grade']
    },

    // Cardio Machines (20 products)
    {
      id: 'cm1',
      name: 'Treadmill Pro Home',
      price: 45999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Motorized treadmill for home',
      stock: 5,
      hasSize: false,
      features: ['2.5 HP motor', '12 programs', 'LCD display']
    },
    {
      id: 'cm2',
      name: 'Exercise Bike Stationary',
      price: 18999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Quiet home exercise bike',
      stock: 8,
      hasSize: false,
      features: ['Magnetic resistance', 'Adjustable seat', 'Heart rate monitor']
    },
    {
      id: 'cm3',
      name: 'Rowing Machine Magnetic',
      price: 32999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Home rowing machine',
      stock: 6,
      hasSize: false,
      features: ['Smooth operation', 'Foldable design', 'Digital monitor']
    },
    {
      id: 'cm4',
      name: 'Elliptical Trainer',
      price: 38999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Low-impact cardio machine',
      stock: 7,
      hasSize: false,
      features: ['16 resistance levels', 'Upper body workout', 'Console display']
    },
    {
      id: 'cm5',
      name: 'Spin Bike Pro',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Studio-quality spin bike',
      stock: 9,
      hasSize: false,
      features: ['Heavy flywheel', 'Belt drive', 'Adjustable handlebars']
    },
    {
      id: 'cm6',
      name: 'Compact Treadmill',
      price: 28999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Cardio Machines',
      description: 'Foldable home treadmill',
      stock: 10,
      hasSize: false,
      features: ['Space-saving', '1.5 HP motor', 'Shock absorption']
    },
    {
      id: 'cm7',
      name: 'Air Bike Assault',
      price: 35999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Fan-based resistance bike',
      stock: 4,
      hasSize: false,
      features: ['Unlimited resistance', 'Full body workout', 'Durable frame']
    },
    {
      id: 'cm8',
      name: 'Recumbent Exercise Bike',
      price: 22999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Comfortable recumbent bike',
      stock: 7,
      hasSize: false,
      features: ['Back support', '12 programs', 'Easy entry']
    },
    {
      id: 'cm9',
      name: 'Stair Climber Machine',
      price: 42999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Vertical climbing machine',
      stock: 5,
      hasSize: false,
      features: ['Natural stepping motion', '20 levels', 'Calorie counter']
    },
    {
      id: 'cm10',
      name: 'Treadmill Commercial Grade',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=400&h=400&fit=crop',
      rating: 5.0,
      category: 'Cardio Machines',
      description: 'Professional treadmill',
      stock: 3,
      hasSize: false,
      features: ['4.0 HP motor', 'Touch screen', 'Commercial quality']
    },
    {
      id: 'cm11',
      name: 'Cross Trainer Elliptical',
      price: 29999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Compact cross trainer',
      stock: 8,
      hasSize: false,
      features: ['Space efficient', 'Smooth motion', 'Multi-grip handles']
    },
    {
      id: 'cm12',
      name: 'Under Desk Bike',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.4,
      category: 'Cardio Machines',
      description: 'Mini pedal exerciser',
      stock: 15,
      hasSize: false,
      features: ['Desk-friendly', 'Portable', 'Quiet operation']
    },
    {
      id: 'cm13',
      name: 'Vertical Climber',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.7,
      category: 'Cardio Machines',
      description: 'Total body climber',
      stock: 6,
      hasSize: false,
      features: ['Full body workout', 'Compact storage', 'Adjustable height']
    },
    {
      id: 'cm14',
      name: 'Folding Treadmill Electric',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: 'Electric folding treadmill',
      stock: 9,
      hasSize: false,
      features: ['Easy fold', '2.0 HP motor', 'LED display']
    },
    {
      id: 'cm15',
      name: 'Water Rowing Machine',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400&h=400&fit=crop',
      rating: 4.9,
      category: 'Cardio Machines',
      description: 'Water resistance rower',
      stock: 4,
      hasSize: false,
      features: ['Natural resistance', 'Wooden frame', 'Quiet operation']
    },
    {
      id: 'cm16',
      name: 'Mini Stepper with Bands',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
      rating: 4.5,
      category: 'Cardio Machines',
      description: 'Compact fitness stepper',
      stock: 12,
      hasSize: false,
      features: ['Resistance bands', 'Digital counter', 'Portable']
    },
    {
      id: 'cm17',
      name: 'Ski Machine Trainer',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.8,
      category: 'Cardio Machines',
      description: 'Nordic ski simulator',
      stock: 5,
      hasSize: false,
      features: ['Low impact', 'Upper & lower body', 'Performance monitor']
    },
    {
      id: 'cm18',
      name: 'Assault Treadmill Curved',
      price: 124999,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957dd9f?w=400&h=400&fit=crop',
      rating: 5.0,
      category: 'Cardio Machines',
      description: 'Self-powered curved treadmill',
      stock: 2,
      hasSize: false,
      features: ['No motor needed', 'Variable speed', 'Elite training']
    },
    {
      id: 'cm19',
      name: 'Hybrid Bike Elliptical',
      price: 27999,
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
      rating: 4.6,
      category: 'Cardio Machines',
      description: '2-in-1 bike and elliptical',
      stock: 6,
      hasSize: false,
      features: ['Dual function', 'Space saver', 'Adjustable resistance']
    },
    {
      id: 'cm20',
      name: 'Manual Treadmill Incline',
      price: 15999,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop',
      rating: 4.4,
      category: 'Cardio Machines',
      description: 'Non-electric incline treadmill',
      stock: 11,
      hasSize: false,
      features: ['No power needed', 'Incline levels', 'Budget-friendly']
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