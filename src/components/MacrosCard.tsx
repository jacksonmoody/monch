import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type MacroType = 'protein' | 'carbs' | 'fat';

interface MacrosCardProps {
  type: MacroType;
  value?: number;
  unit?: 'g' | 'oz' | '%';
}

export const MacrosCard = ({ type, value = 0, unit = 'g' }: MacrosCardProps) => {
  const getMacroInfo = (type: MacroType) => {
    const info = {
      protein: {
        title: 'Protein',
        color: 'text-blue-600',
      },
      carbs: {
        title: 'Carbohydrates',
        color: 'text-green-600',
      },
      fat: {
        title: 'Fat',
        color: 'text-yellow-600',
      }
    };
    return info[type];
  };

  const macroInfo = getMacroInfo(type);

  return (

      <Card className="w-64">
      <CardHeader>
        <CardTitle className={`text-xl font-bold ${macroInfo.color}`}>
          {macroInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          {value}{unit}
        </div>
      </CardContent>
    </Card>

  );
};