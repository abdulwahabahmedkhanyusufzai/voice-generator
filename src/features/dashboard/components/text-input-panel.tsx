"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Coins, Sparkles, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TEXT_MAX_LENGTH } from "@/features/text-to-speech/data/constant"
import { cn } from "@/lib/utils"

export function TextInputPanel() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            const res = await fetch("/api/text-to-speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            if (res.ok) {
                router.push(`/dashboard/audio/${data.id}`);
            } else {
                throw new Error(data.error || "Failed to generate audio");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Text to Speech
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Convert your text into high-quality AI voices in seconds
                    </CardDescription>
                </div>
                <Badge variant="secondary" className="px-2.5 py-0.5 flex items-center gap-1 h-fit bg-primary/10 text-primary border-primary/20 text-[10px]">
                    <Coins className="h-3 w-3" />
                    <span className="font-semibold">100 credits</span>
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="text-input" className="text-xs font-semibold">Content</Label>
                            <span className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                                text.length > TEXT_MAX_LENGTH * 0.9 ? "text-destructive border-destructive/20 bg-destructive/5" : "text-muted-foreground border-border bg-muted/30"
                            )}>
                                {text.length} / {TEXT_MAX_LENGTH}
                            </span>
                        </div>
                        <div className="relative group">
                            <Textarea
                                id="text-input"
                                placeholder="Write something amazing..."
                                className="min-h-[80px] md:min-h-[100px] resize-none bg-background/50 border-border/50 focus-visible:ring-primary/20 transition-all duration-300 text-sm leading-relaxed p-3"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                maxLength={TEXT_MAX_LENGTH}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground bg-muted/20 px-3 py-2 rounded-lg border border-border/30 flex-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="size-1.5 rounded-full bg-primary" />
                                    <span><span className="font-semibold text-foreground">{Math.ceil(text.length / 150)}s</span> length</span>
                                </div>
                                <div className="h-3 w-px bg-border" />
                                <div className="flex items-center gap-1.5">
                                    <div className="size-1.5 rounded-full bg-primary/60" />
                                    <span>High fidelity</span>
                                </div>
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={!text.trim() || loading}
                                size="sm"
                                className="h-9 px-4 text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-3 w-3 border-2 border-background border-t-transparent animate-spin rounded-full" />
                                        ...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send className="h-3.5 w-3.5" />
                                        Generate
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
