export default function Component() {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-[300px] rounded-md bg-card shadow-lg">
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Heads up!</h4>
              <div className="h-[0.3px] flex-1 bg-muted" />
            </div>
            <p className="text-sm text-muted-foreground">You can add components to your app using the cli.</p>
          </div>
          <div className="text-xs text-muted-foreground">2 min ago</div>
        </div>
      </div>
    )
  }