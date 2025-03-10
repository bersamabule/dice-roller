document.addEventListener('DOMContentLoaded', () => {
    const die = document.getElementById('die');
    let isRolling = false;
    
    // Define rotations for each face (1-6)
    const rotations = [
        { x: 0, y: 0, z: 0 },         // 1 (front)
        { x: 0, y: 180, z: 0 },       // 6 (back)
        { x: 0, y: 90, z: 0 },        // 3 (right)
        { x: 0, y: -90, z: 0 },       // 4 (left)
        { x: 90, y: 0, z: 0 },        // 2 (top)
        { x: -90, y: 0, z: 0 }        // 5 (bottom)
    ];
    
    // Map to translate rotation index to actual die value
    const faceValues = [1, 6, 3, 4, 2, 5];
    
    // Track current face for debugging
    let currentFace = 0;

    // Function to roll the die
    function rollDie() {
        if (isRolling) return;
        isRolling = true;
        
        // Play rolling sound if available
        const rollSound = new Audio();
        rollSound.volume = 0.5;
        try {
            rollSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGwxQgZ6AAAAAAAAAAAAAAAAAAAAAAA/+MYxAANcAKIWUAQAgI0JPYbahERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERER/+MYxBYUEAKIAVAQAgERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERER';
        } catch (e) {
            console.log('Sound not supported');
        }
        rollSound.play().catch(e => console.log('Sound play error:', e));
        
        // Add rolling animation class
        die.classList.add('rolling');
        
        // Generate random face (0-5) ensuring it's different from current face
        let randomFace;
        do {
            randomFace = Math.floor(Math.random() * 6);
        } while (randomFace === currentFace && !isFirstRoll);
        
        currentFace = randomFace;
        console.log(`Rolling die... landed on ${faceValues[randomFace]}`);
        
        // After animation completes, show the selected face
        setTimeout(() => {
            die.classList.remove('rolling');
            
            // Apply rotation to show the random face
            const rotation = rotations[randomFace];
            die.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
            
            // Allow rolling again after a short delay
            setTimeout(() => {
                isRolling = false;
            }, 500);
        }, 2000); // Match this with the CSS animation duration
    }
    
    // Initialize die to face 1
    const initialRotation = rotations[0];
    die.style.transform = `rotateX(${initialRotation.x}deg) rotateY(${initialRotation.y}deg) rotateZ(${initialRotation.z}deg)`;
    let isFirstRoll = true;

    // Event listeners for clicking the die
    die.addEventListener('click', () => {
        rollDie();
        isFirstRoll = false;
    });

    // For PowerPoint compatibility - also listen for pointer events
    die.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        rollDie();
        isFirstRoll = false;
    });

    // Fix for some PowerPoint versions - listen for mousedown
    die.addEventListener('mousedown', (e) => {
        e.preventDefault();
        rollDie();
        isFirstRoll = false;
    });

    // Make sure the die is clickable in PowerPoint
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
