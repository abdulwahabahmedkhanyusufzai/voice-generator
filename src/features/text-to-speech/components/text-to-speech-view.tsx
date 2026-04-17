"use client"

import * as React from "react"
import { Settings2, Sparkles, Volume2, HelpCircle, Send, Play, History, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TEXT_MAX_LENGTH } from "../data/constant"
import { cn } from "@/lib/utils"

export function TextToSpeechView() {
    const [text, setText] = React.useState("")
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("settings")

    // Settings State
    const [stability, setStability] = React.useState([50])
    const [similarity, setSimilarity] = React.useState([75])
    const [styleExaggeration, setStyleExaggeration] = React.useState([0])

    return (
        <div className="max-w-4xl mx-auto w-full space-y-8 p-4 md:p-8">
            <div className="relative group">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <Sheet>
                        <div className="flex items-center gap-2">
                            <SheetTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    size="icon-sm" 
                                    className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm"
                                    onClick={() => setActiveTab("history")}
                                >
                                    <History className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    size="icon-sm" 
                                    className="bg-background/50 backdrop-blur-sm border-border/50 shadow-sm"
                                    onClick={() => setActiveTab("settings")}
                                >
                                    <Settings2 className="size-4" />
                                </Button>
                            </SheetTrigger>
                        </div>
                        <SheetContent side="right" className="w-full sm:max-w-md p-0">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                                <SheetHeader className="px-6 pt-6 pb-2">
                                    <div className="flex items-center justify-between">
                                        <SheetTitle>Voice Studio</SheetTitle>
                                    </div>
                                    <SheetDescription>
                                        Configure your voice or view past generations.
                                    </SheetDescription>
                                    <TabsList className="w-full grid grid-cols-2 mt-4">
                                        <TabsTrigger value="settings" className="gap-2">
                                            <Settings2 className="size-3.5" />
                                            Settings
                                        </TabsTrigger>
                                        <TabsTrigger value="history" className="gap-2">
                                            <Clock className="size-3.5" />
                                            History
                                        </TabsTrigger>
                                    </TabsList>
                                </SheetHeader>
                                
                                <div className="flex-1 overflow-y-auto px-6 py-4">
                                    <TabsContent value="settings" className="m-0 space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-semibold">Stability</Label>
                                                <span className="text-xs font-mono text-muted-foreground">{stability}%</span>
                                            </div>
                                            <Slider 
                                                value={stability} 
                                                onValueChange={setStability} 
                                                max={100} 
                                                step={1} 
                                            />
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                Increasing stability can make the voice more consistent but may sound less expressive.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-semibold">Similarity Boost</Label>
                                                <span className="text-xs font-mono text-muted-foreground">{similarity}%</span>
                                            </div>
                                            <Slider 
                                                value={similarity} 
                                                onValueChange={setSimilarity} 
                                                max={100} 
                                                step={1} 
                                            />
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                Higher values boost similarity to the original voice but may introduce artifacts.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-semibold">Style Exaggeration</Label>
                                                <span className="text-xs font-mono text-muted-foreground">{styleExaggeration}%</span>
                                            </div>
                                            <Slider 
                                                value={styleExaggeration} 
                                                onValueChange={setStyleExaggeration} 
                                                max={100} 
                                                step={1} 
                                            />
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                Exaggerates the style of the speaker. Higher values make the voice more stylized.
                                            </p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="history" className="m-0">
                                        <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                                            <div className="size-12 rounded-full bg-muted/20 flex items-center justify-center border border-border/50">
                                                <Clock className="size-6 text-muted-foreground/40" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">No history yet</p>
                                                <p className="text-xs text-muted-foreground max-w-[200px]">
                                                    Your generated audio files will appear here for easy access.
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <Textarea
                            placeholder="Paste your script here or start typing..."
                            className="min-h-[120px] md:min-h-[150px] resize-none bg-card/50 backdrop-blur-sm border-border/50 text-base p-6 pr-16 focus-visible:ring-primary/20 transition-all duration-300 shadow-sm rounded-2xl"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={TEXT_MAX_LENGTH}
                        />
                        <div className="absolute bottom-4 right-4 text-[10px] font-medium px-2 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground">
                            {text.length} / {TEXT_MAX_LENGTH}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs gap-1.5 px-0">
                                <HelpCircle className="size-3.5" />
                                Don't know how?
                            </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button 
                                onClick={() => setIsGenerating(true)}
                                disabled={!text.trim() || isGenerating}
                                className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 h-10"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <div className="size-3 border-2 border-background border-t-transparent animate-spin rounded-full" />
                                        Generating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Send className="size-4" />
                                        Generate
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-2 border-dashed border-border/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 bg-muted/5">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="size-12 rounded-full bg-background/50 border-border/50 shadow-sm hover:bg-primary/5 hover:text-primary transition-colors">
                        <Volume2 className="size-5" />
                    </Button>

                    <div className="size-24 rounded-full bg-muted/20 flex items-center justify-center border border-border/50 shadow-inner group cursor-pointer">
                        <div className="size-20 rounded-full bg-background/40 flex items-center justify-center border border-border/50 shadow-sm group-hover:scale-105 transition-transform duration-300">
                            <Sparkles className="size-10 text-primary/40 fill-primary/10 group-hover:rotate-12 transition-transform" />
                        </div>
                    </div>

                    <Button variant="outline" size="icon" className="size-12 rounded-full bg-background/50 border-border/50 shadow-sm hover:bg-primary/5 hover:text-primary transition-colors group">
                        <Play className="size-6 text-muted-foreground/50 fill-muted-foreground/10 ml-1" />
                    </Button>
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground italic">
                        Once you generate, your audio will appear here
                    </p>
                    <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto">
                        Your history is automatically saved to your dashboard for later use.
                    </p>
                </div>
            </div>
        </div>
    )
}
