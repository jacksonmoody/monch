import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type MacroType = "protein" | "carbs" | "fat" | "calories";

interface MacrosCardProps {
  type: MacroType;
  value?: number;
  unit?: string;
  goals?: number;
}

export const MacrosCard = ({
  type,
  value = 0,
  unit = "g",
  goals = 0,
}: MacrosCardProps) => {
  const getMacroInfo = (type: MacroType) => {
    const info = {
      protein: {
        title: "Protein",
        color: "text-blue-600",
      },
      carbs: {
        title: "Carbohydrates",
        color: "text-green-600",
      },
      fat: {
        title: "Fat",
        color: "text-yellow-600",
      },
      calories: {
        title: "Calories",
        color: "text-red-600",
      },
    };
    return info[type];
  };

  const macroInfo = getMacroInfo(type);

  return (
    <Card className={`w-64 ${value >= goals && "bg-green-200"}`}>
      <CardHeader>
        <CardTitle className={`text-xl font-bold ${macroInfo.color}`}>
          {macroInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold">
            {value ? Math.round(value) : "0"}
          </div>
          <div className="text-2xl text-gray-600">
            / {goals} {unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
