# Notification System

A flexible, modern notification system for React applications, inspired by react-notifications but built from scratch for the Gelato API project.

## Features

- Four notification types: info, success, warning, error
- Customizable positioning (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
- Auto-dismiss with configurable timeouts
- Click callbacks for interactive notifications
- Smooth animations
- Full TypeScript support
- Mobile responsive
- Accessible design with ARIA attributes

## Usage

### Basic Setup

1. Wrap your application with the `NotificationProvider`:

```jsx
import { NotificationProvider } from "../context/NotificationContext";
import { NotificationContainer } from "../ui/Notification";

function App() {
  return (
    <NotificationProvider>
      <div className="app">
        {/* Your app content */}
        <NotificationContainer position="top-right" />
      </div>
    </NotificationProvider>
  );
}
```

2. Initialize the NotificationManager in your App component:

```jsx
import { useEffect } from "react";
import { NotificationManager, setNotificationContext } from "../ui/Notification";

function App() {
  useEffect(() => {
    const notificationSetup = () => {
      import('../context/NotificationContext').then(module => {
        const context = module.useNotifications();
        setNotificationContext(context);
      });
    };
    
    setTimeout(notificationSetup, 0);
  }, []);
  
  // rest of your component
}
```

3. Use the NotificationManager to show notifications:

```jsx
import { NotificationManager } from "../ui/Notification";

function MyComponent() {
  const showSuccessNotification = () => {
    NotificationManager.success("Operation completed successfully", "Success");
  };
  
  return (
    <button onClick={showSuccessNotification}>
      Show Success Notification
    </button>
  );
}
```

### NotificationManager API

```javascript
// Show an info notification
NotificationManager.info(message, title, timeOut, callback, priority);

// Show a success notification
NotificationManager.success(message, title, timeOut, callback, priority);

// Show a warning notification
NotificationManager.warning(message, title, timeOut, callback, priority);

// Show an error notification
NotificationManager.error(message, title, timeOut, callback, priority);

// Remove a specific notification
NotificationManager.remove(id);
```

#### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| message | string | required | The notification message |
| title | string | null | The notification title (optional) |
| timeOut | number | 3000 (info/success/warning), 5000 (error) | Time in milliseconds before auto-dismiss |
| callback | function | null | Function to call when notification is clicked |
| priority | boolean | false | If true, adds notification to the top of the stack |

### Using with Hooks

You can also use the hook approach for more control:

```jsx
import { useNotifications } from "../context/NotificationContext";

function MyComponent() {
  const { showSuccess, showError } = useNotifications();
  
  const handleSubmit = async () => {
    try {
      await submitData();
      showSuccess("Data submitted successfully");
    } catch (error) {
      showError(error.message);
    }
  };
  
  // rest of your component
}
```

## Customizing Notifications

### Container Position

The `NotificationContainer` accepts a `position` prop with these values:
- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`
- `top-center`
- `bottom-center`

```jsx
<NotificationContainer position="bottom-right" />
```

### Styling

To customize the appearance, you can modify the CSS in `Notification.css`. 