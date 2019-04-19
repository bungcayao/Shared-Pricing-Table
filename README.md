# Pricing Table

This is a Pricing Table used for POPin LIVE.<br>
It is built on top of the [Bulma Extension CSS Framework](https://wikiki.github.io/components/pricingtable/) and styled to follow sketch mockups. This Pricing Table is a shared repo used in an AngularJS Web App and Landing Page (Instangepage Landing Page Editor).

Usage/Comments
---
- Everything that is used by the App and Landing apge are inline or in document of the `index.htm` page. 
- Everything else that is site or app specific will live in their own environments.<br>
- Everyting was built with the idea of the Pricing Table CSS having no conflicts with the App's CSS.

Notables
---
- This pricing table tracks URL Parameters, helping us track campaigns, gclid, keywords and other `utm` parameters.
- The js passes parameters to external links based off of user's origin.
- In return we're able to capture analytics through Google Tag Manager, Google Ad Campaigns, and HubSpot.

HTML, CSS, and JS in Action
--
https://www.popin.live/pricing/