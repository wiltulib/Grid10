import { ShapeTemplate } from '../types';

export const BOARD_SIZE = 10;

export const SHAPES: ShapeTemplate[] = [
  // 1x1 Dot
  {
    id: 'dot_1x1',
    name: '1x1 Dot',
    matrix: [[1]],
    colorName: 'coral',
    gradient: 'bg-[#FF5A5F]',
    border: 'border-ink',
    shadow: '',
    weight: 12,
  },

  // 2-bars
  {
    id: 'bar_2x1_h',
    name: '2x1 Horizontal',
    matrix: [[1, 1]],
    colorName: 'amber',
    gradient: 'bg-[#F59E0B]',
    border: 'border-ink',
    shadow: '',
    weight: 9,
  },
  {
    id: 'bar_1x2_v',
    name: '1x2 Vertical',
    matrix: [[1], [1]],
    colorName: 'amber',
    gradient: 'bg-[#F59E0B]',
    border: 'border-ink',
    shadow: '',
    weight: 9,
  },

  // 3-bars
  {
    id: 'bar_3x1_h',
    name: '3x1 Horizontal',
    matrix: [[1, 1, 1]],
    colorName: 'cyan',
    gradient: 'bg-[#0891B2]',
    border: 'border-ink',
    shadow: '',
    weight: 8,
  },
  {
    id: 'bar_1x3_v',
    name: '1x3 Vertical',
    matrix: [[1], [1], [1]],
    colorName: 'cyan',
    gradient: 'bg-[#0891B2]',
    border: 'border-ink',
    shadow: '',
    weight: 8,
  },

  // 4-bars
  {
    id: 'bar_4x1_h',
    name: '4x1 Horizontal',
    matrix: [[1, 1, 1, 1]],
    colorName: 'blue',
    gradient: 'bg-[#2563EB]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },
  {
    id: 'bar_1x4_v',
    name: '1x4 Vertical',
    matrix: [[1], [1], [1], [1]],
    colorName: 'blue',
    gradient: 'bg-[#2563EB]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },

  // 5-bars
  {
    id: 'bar_5x1_h',
    name: '5x1 Horizontal',
    matrix: [[1, 1, 1, 1, 1]],
    colorName: 'indigo',
    gradient: 'bg-[#4F46E5]',
    border: 'border-ink',
    shadow: '',
    weight: 5,
  },
  {
    id: 'bar_1x5_v',
    name: '1x5 Vertical',
    matrix: [[1], [1], [1], [1], [1]],
    colorName: 'indigo',
    gradient: 'bg-[#4F46E5]',
    border: 'border-ink',
    shadow: '',
    weight: 5,
  },

  // 2x2 Square
  {
    id: 'sq_2x2',
    name: '2x2 Square',
    matrix: [
      [1, 1],
      [1, 1],
    ],
    colorName: 'purple',
    gradient: 'bg-[#7C3AED]',
    border: 'border-ink',
    shadow: '',
    weight: 7,
  },

  // 3x3 Square (Big Challenge!)
  {
    id: 'sq_3x3',
    name: '3x3 Square',
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    colorName: 'rose',
    gradient: 'bg-[#E11D48]',
    border: 'border-ink',
    shadow: '',
    weight: 3,
  },

  // Small Corners (2x2 bounding box, 3 blocks)
  {
    id: 'corner_sm_tl',
    name: 'Small Corner TL',
    matrix: [
      [1, 1],
      [1, 0],
    ],
    colorName: 'orange',
    gradient: 'bg-[#EA580C]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },
  {
    id: 'corner_sm_tr',
    name: 'Small Corner TR',
    matrix: [
      [1, 1],
      [0, 1],
    ],
    colorName: 'orange',
    gradient: 'bg-[#EA580C]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },
  {
    id: 'corner_sm_bl',
    name: 'Small Corner BL',
    matrix: [
      [1, 0],
      [1, 1],
    ],
    colorName: 'orange',
    gradient: 'bg-[#EA580C]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },
  {
    id: 'corner_sm_br',
    name: 'Small Corner BR',
    matrix: [
      [0, 1],
      [1, 1],
    ],
    colorName: 'orange',
    gradient: 'bg-[#EA580C]',
    border: 'border-ink',
    shadow: '',
    weight: 6,
  },

  // Large Corners (3x3 bounding box, 5 blocks)
  {
    id: 'corner_lg_tl',
    name: 'Large Corner TL',
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    colorName: 'teal',
    gradient: 'bg-[#0D9488]',
    border: 'border-ink',
    shadow: '',
    weight: 4,
  },
  {
    id: 'corner_lg_tr',
    name: 'Large Corner TR',
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    colorName: 'teal',
    gradient: 'bg-[#0D9488]',
    border: 'border-ink',
    shadow: '',
    weight: 4,
  },
  {
    id: 'corner_lg_bl',
    name: 'Large Corner BL',
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    colorName: 'teal',
    gradient: 'bg-[#0D9488]',
    border: 'border-ink',
    shadow: '',
    weight: 4,
  },
  {
    id: 'corner_lg_br',
    name: 'Large Corner BR',
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
    colorName: 'teal',
    gradient: 'bg-[#0D9488]',
    border: 'border-ink',
    shadow: '',
    weight: 4,
  },
];
