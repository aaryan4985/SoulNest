// Utility functions for notifications and error handling

export function handleError(error) {
  if (typeof error === "string") {
    alert(error);
  } else if (error && error.message) {
    alert(error.message);
  } else {
    alert("An unknown error occurred.");
  }
}

export function handleSuccess(message) {
  alert(message);
}
