import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Guard Lengths Guide - Buzz Cut Clipper Sizes",
  description: "Complete guide to clipper guard lengths for buzz cuts, from ultra-short to longer styles.",
};

const guardLengths = [
  {
    guard: "Guard #0",
    length: "0.5mm",
    style: "几乎光头",
    description: "极短的头发长度，几乎看不见头发，适合想要最短发型的用户。",
    suitableFor: ["脱发严重的人群", "军人风格爱好者", "夏季极简风格"],
    maintenance: "需要频繁修剪，大约每1-2周"
  },
  {
    guard: "Guard #1",
    length: "3mm",
    style: "超短寸头",
    description: "非常短的头发，清爽干净，是经典军事风格的选择。",
    suitableFor: ["专业商务环境", "运动员", "低维护需求者"],
    maintenance: "每2-3周修剪一次",
    category: "ultra-short"
  },
  {
    guard: "Guard #2",
    length: "6mm",
    style: "短寸头",
    description: "稍微长一些的超短发型，仍然非常整洁和专业。",
    suitableFor: ["办公环境", "学生", "第一次尝试寸头的人"],
    maintenance: "每3-4周修剪一次",
    category: "ultra-short"
  },
  {
    guard: "Guard #3",
    length: "10mm",
    style: "中短寸头",
    description: "开始有一些头发质感，但仍然保持短发的便利性。",
    suitableFor: ["日常休闲", "各种头型", "过渡发型"],
    maintenance: "每4-5周修剪一次",
    category: "ultra-short"
  },
  {
    guard: "Guard #4",
    length: "13mm",
    style: "经典寸头",
    description: "最受欢迎的寸头长度，平衡了风格和便利性。",
    suitableFor: ["大多数人群", "各种场合", "初学者推荐"],
    maintenance: "每5-6周修剪一次",
    category: "classic"
  },
  {
    guard: "Guard #5",
    length: "16mm",
    style: "中等寸头",
    description: "稍长的寸头风格，提供更多造型可能性。",
    suitableFor: ["想要一些造型选择的人", "头皮敏感者", "商务休闲"],
    maintenance: "每6-7周修剪一次",
    category: "classic"
  },
  {
    guard: "Guard #6",
    length: "19mm",
    style: "长寸头",
    description: "较长的寸头，可以有轻微的造型和纹理。",
    suitableFor: ["保守的发型改变", "头发稀疏者", "冬季保暖"],
    maintenance: "每7-8周修剪一次",
    category: "classic"
  },
  {
    guard: "Guard #7",
    length: "22mm",
    style: "长款寸头",
    description: "最长的寸头选择之一，更容易从长发过渡。",
    suitableFor: ["从长发过渡", "保守选择", "寒冷气候"],
    maintenance: "每8-10周修剪一次",
    category: "long-buzz"
  },
  {
    guard: "Guard #8",
    length: "25mm",
    style: "超长寸头",
    description: "最长的寸头长度，接近短发的感觉。",
    suitableFor: ["不确定是否适合超短发", "渐进式改变", "头皮保护"],
    maintenance: "每10-12周修剪一次",
    category: "long-buzz"
  }
];

const categoryColors: Record<string, string> = {
  "ultra-short": "border-red-200 bg-red-50",
  "classic": "border-blue-200 bg-blue-50",
  "long-buzz": "border-green-200 bg-green-50"
};

export default function GuardLengthsPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 container px-4 py-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/buzz-cut-guides">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回指南
          </Link>
        </Button>
                 <div className="flex-1">
           <h1 className="text-2xl md:text-3xl font-bold">Guard Length Guide</h1>
           <p className="text-muted-foreground">Understanding different clipper guard sizes and their effects</p>
         </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <Ruler className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-semibold">选择合适的长度</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            理发器卡式决定了最终的头发长度。了解每个长度的特点，选择最适合您的风格。
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">按类别浏览</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/buzz-cut-guides/guard-lengths/guard-1-3-ultra-short">
              <Button variant="outline" className="border-red-200 hover:bg-red-50">
                Guard #1-3 超短款
              </Button>
            </Link>
            <Link href="/buzz-cut-guides/guard-lengths/guard-4-6-classic">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                Guard #4-6 经典款
              </Button>
            </Link>
            <Link href="/buzz-cut-guides/guard-lengths/guard-7-8-long-buzz">
              <Button variant="outline" className="border-green-200 hover:bg-green-50">
                Guard #7-8 长款
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {guardLengths.map((guard) => (
            <Card key={guard.guard} className={`${categoryColors[guard.category || 'classic']} border-2`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {guard.guard.replace('Guard #', '#')}
                    </div>
                    <div>
                      <h3 className="text-xl">{guard.style}</h3>
                      <p className="text-sm text-muted-foreground font-normal">长度: {guard.length}</p>
                    </div>
                  </CardTitle>
                  <Button size="sm">
                    试用此长度
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{guard.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">适合人群:</h4>
                    <ul className="text-sm space-y-1">
                      {guard.suitableFor.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">维护频率:</h4>
                    <p className="text-sm text-muted-foreground">{guard.maintenance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">不确定选择哪个长度？</h2>
          <p className="text-muted-foreground">
            使用我们的AI模拟器预览不同长度的效果
          </p>
          <Button asChild size="lg">
            <Link href="/buzz-cut-simulator">
              尝试不同长度
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新手建议</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              第一次尝试寸头？建议从 Guard #4 或 #5 开始，这样即使不满意也容易调整。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">季节考虑</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              夏季可以选择更短的长度保持凉爽，冬季建议选择稍长的长度以保暖。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">专业建议</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              办公环境建议选择 Guard #3-6，既保持专业形象又不会过于严肃。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 