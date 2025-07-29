---
title: Building My Perfect Keyboard — The Plan
description: Perfecting every part of my Lily58 keyboard.
pubDate: 2025-07-29
---

I use a wireless Lily58 (a split, ergonomic keyboard) at work, and it's great. I love the layout, the slim profile, and the long battery life. Recently, though, I built a Photon 65% keyboard from CannonKeys, and it's made me realize how hollow my work board sounds _and_ feels.

It's time to change that!

## Sound Comparison

Before I get into the details of my plan, I want to share a sound comparison to illustrate where I'm starting from and what I'm aiming for. I've recorded the sound of my current Lily58, a Corne with an aluminum case, and the Photon.

Here's how they sound:

| Board                 | Sound Test                                                     |
| --------------------- | -------------------------------------------------------------- |
| [Lily58] (Current)    | <audio controls preload="metadata" src="./lily58.mp3"></audio> |
| [Corne Premium]       | <audio controls preload="metadata" src="./corne.mp3"></audio>  |
| [Photon] (Target)[^1] | <audio controls preload="metadata" src="./photon.mp3"></audio> |

I hope you can hear a big difference. The Lily58 is hollow and the switch stabilizers rattle a lot. The Corne is certainly sounds a bit more solid, but the switches are still shallow in sound profile. Then we have the Photon, wow! The sound is deep, crisp, and satisfying. It's got _thock_!

## The Plan

The first step is going to be picking the switches. The existing Kailh Choc v1 switches just don't sound or feel that great. This isn't surprising to anyone who's tried them. At the same time, the full-size MX-style switches in the Photon are too tall for a small ergo board like the Lily58, and they would make for a disproportionately tall build. 

As a middle ground, both the Choc v2 and the Gateron KS-33 (or Low Profile 2.0) switches are the clear options. Both are decently low-profile, but they should provide a better sound and feel than the Choc v1 switches. While I don't think we'll get to sounding as good as the Photon, we'll do our best.

The Choc v2 switches can sound pretty good. I know a couple of people with the [Lofree Flow](https://www.lofree.co/products/lofree-flow-the-smoothest-mechanical-keyboard), and I'm pretty impressed with how the all POM Choc v2 switches sound. The KS-33 on the other hand are recommended more often, so I'm willing to give them a try, too.

Great switches are only one part of the equation. After picking my switches, I'll be designing a new aluminum chassis, which will give us a solid feel and deeper sound than the existing thin plastic case.

A new PCB will also be part of the design. No working around a separate microcontroller board like the nice!nano. By integrating the wireless controller directly onto the board, the final build can be slimmer and more cohesive.

I'm excited.

## What's Next?

I've gone ahead and ordered a [Gateron KS-33 switch tester](https://www.gateron.com/products/gateron-low-profile-switches-series-tester-with-sample-set) and [every Choc v2 switch](https://kailhswitch.net/collections/choc-switch) I could find. In the next post, I'll share my thoughts on the switches and which ones I choose.

I want to share every step of the process of building this keyboard. My goal isn't just to show off the final product, but to help you understand how each part fits together to create the best possible keyboard (for me, at least!).

[Lily58]: https://typeractive.xyz/pages/build/lily58_choc?c=%257B%2522cases%2522%253A%2522navy-3dp%2522%252C%2522display_covers%2522%253A%2522navy-3dp-cutout%2522%252C%2522batteries%2522%253A%2522110mah-3-7v-lipo%2522%252C%2522headers%2522%253A%2522no-solder-view%2522%252C%2522microcontrollers%2522%253A%2522nice-nano%2522%252C%2522displays%2522%253A%2522nice-view%2522%252C%2522switches%2522%253A%2522kailh-choc-red%2522%252C%2522keycaps%2522%253A%2522sc-mbk-legend-ergo%2522%257D&e=%255B%255D
[Corne Premium]: https://typeractive.xyz/pages/build/corne_choc?c=%257B%2522cases%2522%253A%2522midnight-premium%2522%252C%2522display_covers%2522%253A%2522clear-acrylic%2522%252C%2522batteries%2522%253A%2522110mah-3-7v-lipo%2522%252C%2522headers%2522%253A%2522no-solder-view%2522%252C%2522microcontrollers%2522%253A%2522nice-nano%2522%252C%2522displays%2522%253A%2522nice-view%2522%252C%2522switches%2522%253A%2522kailh-choc-pink%2522%252C%2522keycaps%2522%253A%2522mbk-hypersonic%2522%257D&e=%255B%255D
[Photon]: https://cannonkeys.com/products/photon
[^1]: It's pretty important to note that this is using TTC Venus switches, GMK keycaps, TX "AP" Stabilizers Rev. 4, and case foam. All of these make a difference to the sound profile.
