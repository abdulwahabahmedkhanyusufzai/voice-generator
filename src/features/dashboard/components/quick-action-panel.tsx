import { quickActions } from "../data/quick-action";
import { QuickActionCard } from "./quick-action-card";

export function QuickActionPanel() {
    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
                <p className="text-sm text-muted-foreground">Start creating with our AI-powered voice tools</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {quickActions.map((action) => (
                    <QuickActionCard
                        key={action.title}
                        title={action.title}
                        description={action.description}
                        href={action.href}
                        gradient={action.gradient}
                        icon={action.icon}
                    />
                ))}
            </div>
        </div>
    )
}
