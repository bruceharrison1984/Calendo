---
title: 🔧 Components
description: Implementing custom components for different visual styles
---

## _Section Disclaimer_

_The components shown in this section represent the default components, and normally would be over-ridden and not directly instantiated.
They are shown here to help identify where they appear within Schedulely, and to aid in developing custom versions._

_The example code may contain additional elements that are not used or necessary within the context of the actual component(Schedulely), but are
necessary to display an example._

---

## Description

Schedulely is comprised of a number of smaller components that all work together to display the overall component. Care has been taken to make sure these can be easily over-ridden.

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

The default components aren't really extensible. For example, the default event component onClick handler just prints the event data in to the console. As a consumer, you would extend the `EventComponent` interface to implement your own Event component that has the behavior you require.

All default components have interfaces available, and custom components can be passed in via the `schedulelyComponents` property.

Care should be taken when styling custom components. The underlying calendar layout is flexible, but it can still be easily broken.

## Interfaces

The following interfaces can be used to craft custom components to be used in Schedulely.

| Component           | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| DayComponent        | Represents a single Day on the calendar                                                   |
| DayHeaderComponent  | Date header that appears on a Day                                                         |
| DayOfWeekComponent  | Day of week displayed at top of calendar                                                  |
| EventComponent      | Single event on the calendar                                                              |
| HeaderComponent     | The banner that appears at the top of the calendar                                        |
| MoreEventsIndicator | Indicator that appears at the bottom of a day if it has more events than can be displayed |