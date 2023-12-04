// ========================
// Variables
// ========================
const popoverTriggers = document.querySelectorAll(".popover-trigger");

// ========================
// Functions
// ========================
/**
 * Calculates top and left position of popover
 * @param {HTMLElement} popoverTrigger
 * @param {HTMLElement} popover
 * @returns {Object} Top and left values in px (without units)
 */
function calculatePopoverPosition(popoverTrigger, popover) {
  const popoverTriggerRect = popoverTrigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const { position } = popover.dataset;
  const space = 20;

  if (position === "top") {
    return {
      left:
        (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
        popoverRect.width / 2,
      top: popoverTriggerRect.top - popoverRect.height - space,
    };
  }

  if (position === "left") {
    return {
      left: popoverTriggerRect.left - popoverRect.width - space,
      top:
        (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
        popoverRect.height / 2,
    };
  }

  if (position === "right") {
    return {
      left: popoverTriggerRect.right + space,
      top:
        (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
        popoverRect.height / 2,
    };
  }

  if (position === "bottom") {
    return {
      left:
        (popoverTriggerRect.left + popoverTriggerRect.right) / 2 -
        popoverRect.width / 2,
      top: popoverTriggerRect.bottom + space,
    };
  }
}

// Positions popover
popoverTriggers.forEach((popoverTrigger) => {
  const popover = document.querySelector(`#${popoverTrigger.dataset.target}`);
  const popoverPosition = calculatePopoverPosition(popoverTrigger, popover);

  popover.style.top = `${popoverPosition.top}px`;
  popover.style.left = `${popoverPosition.left}px`;

  // Hides popover once it is positioned
  popover.setAttribute("hidden", true);
});

// Show or hide popover when user clicks on the trigger
document.addEventListener("click", (event) => {
  const popoverTrigger = event.target.closest(".popover-trigger");
  if (!popoverTrigger) return;

  const popover = document.querySelector(`#${popoverTrigger.dataset.target}`);
  if (popover.hasAttribute("hidden")) {
    popover.removeAttribute("hidden");
  } else {
    popover.setAttribute("hidden", true);
  }
});

// Hides popover user clicks something other than trigger or popover
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".popover") &&
    !event.target.closest(".popover-trigger")
  ) {
    const popovers = [...document.querySelectorAll(".popover")];
    popovers.forEach((popover) => popover.setAttribute("hidden", true));
  }
});
