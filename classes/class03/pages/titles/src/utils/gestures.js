const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDown = new GestureDescription("scroll-down"); // ✊️
const ScrollUp = new GestureDescription("scroll-up"); // 🖐
const ScissorsGesture = new GestureDescription("scissors"); // ✌️
const RocknRollGesture = new GestureDescription("rock-n-roll"); // 🤘
const ClickGesture = new GestureDescription("click"); // 🤘

// Rock
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDown.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDown.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDown.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollDown.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  ScrollUp.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Scissors
//------------------------------------------------------------------------------

// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

// Rock n Roll
//------------------------------------------------------------------------------
RocknRollGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);

RocknRollGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
RocknRollGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

RocknRollGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
RocknRollGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

RocknRollGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);

// Click
//
ClickGesture.addCurl(Finger. Index, FingerCurl.HalfCurl, 0.8)
ClickGesture.addCurl(Finger. Index, FingerCurl.FullCurl, 0.5)

ClickGesture.addCurl(Finger. Thumb, FingerCurl.NoCurl, 1.0)
ClickGesture.addCurl(Finger. Thumb, FingerCurl.HalfCurl, 0.4)

ClickGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9)

ClickGesture.addCurl(Finger. Ring, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger. Ring, FingerCurl.FullCurl, 0.9)

ClickGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger. Pinky, FingerCurl.FullCurl, 0.9)

const knownGestures = [
    ScrollDown,
    ScrollUp,
    ScissorsGesture,
    RocknRollGesture,
    ClickGesture
]

const gestureStrings = {
    'scroll-down': '✊️',
    'scroll-up': '🖐',
    'rock-n-roll': '🤘',
    scissors: '✌️',
    click: '🤏 ',

}
export { knownGestures, gestureStrings };
