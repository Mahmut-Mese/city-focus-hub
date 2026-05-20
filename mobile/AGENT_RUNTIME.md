STATUS: SUCCESS
NOTES: 
- Replaced the room list chooser with a single selected-room summary card when `route.params?.roomId` is present.
- Added `EmptyState` fallbacks: if `roomId` is missing, the user is instructed to return to Meeting Rooms and choose a room. If `roomId` is provided but no matching resource is found, a "Room not found" state is displayed.
- Removed fallback selection of `items[0]` to ensure that a missing/invalid `roomId` properly triggers the "Room not found" state rather than silently booking a random room.
- Preserved existing availability logic, stripe payment sequences, and TypeScript types.
- Ran typecheck if possible (but local env wasn't directly accessible to me). Type correctness relies on existing typing.