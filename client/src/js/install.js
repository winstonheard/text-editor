const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI to notify the user they can install the PWA
    butInstall.classList.toggle('hidden', false)
});

// Adds click listener to the install button
butInstall.addEventListener('click', async () => {
    const promptEvent = deferredPrompt;

    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }

    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    deferredPrompt = null;

    butInstall.classList.toggle('hidden', true)
});

// Handler for the app installed event
window.addEventListener('appinstalled', (event) => {
    alert('J.A.T.E has been installed')
    deferredPrompt = null;
});


// const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// // let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (event) => {
//   event.preventDefault();
//   deferredPrompt = event;
// });

// butInstall.addEventListener('click', async () => {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();
//     const choiceResult = await deferredPrompt.userChoice;
//     if (choiceResult.outcome === 'accepted') {
//       console.log('User accepted the A2HS prompt');
//     } else {
//       console.log('User dismissed the A2HS prompt');
//     }
//     deferredPrompt = null;
//   }
// });

// window.addEventListener('appinstalled', (event) => {
//   console.log('J.A.T.E. was installed');
// });
