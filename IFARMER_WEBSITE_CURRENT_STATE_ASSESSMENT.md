# iFarmer Website Current State Assessment

Prepared on March 24, 2026

## Purpose

This document summarises the current state of the iFarmer website before upgrade work begins. It is intended to help the client understand:

- what currently exists on the website
- what is working reasonably well
- what is missing
- what is wrong or limiting business growth
- why an upgrade is necessary for SEO, usability, lead capture, and content management

This review is based on the current website codebase and frontend behaviour. It does not independently verify whether all business claims, team details, statistics, or contact details currently shown on the website are factually correct, so those should be confirmed with the client.

## Assessment Summary

The current website is best described as a modern-looking brochure website built as a frontend application. It presents the business visually, but it is not yet set up as a fully managed business website.

At the moment, the site does **not** provide:

- a real admin dashboard
- a working blog publishing system
- a database for contact submissions
- appointment booking management
- admin review of submitted forms
- structured SEO implementation for strong search visibility

In simple terms: the website looks presentable, but most of the business-critical functions the company needs are either missing or only simulated on the screen.

## What Currently Exists

The website currently includes the following public-facing sections:

- Home page
- About page
- Services page
- Knowledge Center page
- Contact page
- WhatsApp contact button

It also has:

- responsive navigation for desktop and mobile
- a service showcase
- testimonials section
- image gallery
- contact and callback forms on the contact page
- newsletter subscription section

From a visual point of view, the site has a good starting structure for a corporate agricultural brand. It is already arranged like a marketing website and can be improved rather than rebuilt from scratch.

## What Is Good About the Current Website

- The site has a clear page structure and covers the main company information areas.
- The design is modern enough to serve as a good starting point.
- It is mobile-aware and includes a mobile navigation menu.
- The services are clearly presented.
- The contact page gives visitors multiple ways to reach the business.
- The website builds successfully for production, which means the frontend is in a usable starting state.

## What Is Wrong With the Current Website

### 1. It is not yet a real business management website

The current site is mostly static. Content such as services, statistics, testimonials, team members, and knowledge articles is hard-coded into the frontend.

This means:

- staff cannot log in and update content
- blog posts cannot be added from an admin area
- services cannot be edited without developer involvement
- testimonials, features, and company information cannot be managed by non-technical staff

This is one of the biggest limitations in the current website.

### 2. Contact forms are not actually connected to anything

The contact form, callback request form, and newsletter form currently behave like working forms on the screen, but they do not send or store real data.

This means:

- messages are not being saved to a database
- the admin cannot review submitted contacts
- callback requests are not being tracked
- newsletter signups are not being collected into a mailing list
- the business can lose leads without knowing it

For a company website, this is a serious operational gap.

### 3. There is no appointment booking system

The current website does not include a real booking workflow for consultations, meetings, service appointments, or demos.

There is also no admin-side system to:

- see bookings
- approve or reschedule bookings
- assign staff
- track booking history

### 4. There is no admin dashboard or CMS

There is no protected admin area where authorised staff can:

- publish blog posts
- edit services
- update homepage sections
- manage contact submissions
- manage appointments
- manage newsletter subscribers

This means the website is not yet scalable as a business tool.

### 5. The SEO setup is weak for long-term growth

The current website has several SEO limitations:

- the site uses a single-page frontend setup, which is workable but needs extra SEO handling
- pages do not appear to have their own unique metadata setup
- there is no visible sitemap file
- there is no visible structured data/schema implementation
- social preview metadata is generic and partly placeholder-based
- the current social share image reference appears to point to a missing asset
- the site icon is still a placeholder asset

Practical effect:

- search engines get less structured information than they should
- social sharing previews may appear incorrect or incomplete
- individual services and articles have weaker discoverability
- the website is less prepared for competitive search ranking

### 6. The blog / Knowledge Center is not a real publishing system

The Knowledge Center currently looks like a content section, but it is not functioning like a real blog.

Current limitations:

- articles are hard-coded
- there is no admin publishing workflow
- there are no visible article detail pages
- articles do not have their own SEO-friendly URLs
- article cards appear present but do not provide a true content publishing system

From an SEO and content marketing perspective, this prevents the company from using blog content properly to attract search traffic.

### 7. There are content trust and brand consistency issues

Some content currently appears inconsistent and should be reviewed carefully before upgrade work continues.

Examples of the kind of issues found:

- inconsistent brand naming across the site
- inconsistent phone numbers in different call-to-action areas
- some content references appear to point to Kenya-based names and locations while the company contact information is Nigeria-based
- some social media links are placeholders rather than real company profiles
- some business claims, statistics, testimonials, and team details appear hard-coded and should be verified for accuracy

This creates a trust problem. Even when a website looks good visually, inconsistent business details can reduce credibility with customers, partners, and search engines.

### 8. Usability is only partially complete

The site is usable at a basic level, but it is not yet refined for lead generation or user journeys.

Current usability gaps include:

- no clear booking flow for consultations or enquiries
- no admin follow-up workflow after a visitor submits a form
- article listing without full article journeys
- service content grouped into tabs instead of dedicated SEO-friendly service pages
- some interactive elements that look active but do not connect to business operations
- forms rely heavily on placeholders instead of stronger field labelling and data handling

In business terms, the website currently informs visitors, but it does not manage them well.

### 9. Performance and maintainability need improvement

The frontend works, but the current implementation shows signs of being an early-stage build rather than a production-optimised business platform.

Observed concerns include:

- some image files are large and likely to affect page load speed
- a mix of local and externally hosted images creates reliability risk
- some template/default project details are still present in the project
- dependencies for future capability exist, but the actual business features are not yet implemented

This does not mean the website is broken, but it does mean it needs refinement before it can support strong SEO and business operations.

### 10. No analytics or conversion tracking were found

No clear analytics or tracking setup was found during this review.

That means the business may currently have no reliable way to measure:

- how many visitors use the site
- which pages perform best
- which forms generate leads
- where enquiries are coming from
- how SEO improvements are affecting results

Without this, it is difficult to measure return on investment from the website.

## Business Risks if Left As-Is

If the website remains in its current state, the main business risks are:

- missed customer enquiries
- poor visibility in Google compared with stronger competitors
- difficulty updating content quickly
- dependence on a developer for simple website edits
- weak trust due to inconsistent business details
- no structured path for scaling blog content, lead capture, and appointment management

## Recommended Upgrade Direction

The website should be upgraded in phases.

### Phase 1: Foundation and credibility

- clean up and verify all business content
- standardise brand name, contact details, and calls to action
- fix metadata, social preview setup, and technical SEO basics
- add analytics and conversion tracking
- optimise media and performance

### Phase 2: Business functionality

- connect contact forms to a real database and notification system
- add appointment booking
- create an admin area for viewing contacts and bookings
- create secure login for authorised staff

### Phase 3: Content and SEO growth

- build a proper blog publishing system
- add article detail pages with SEO-friendly URLs
- allow admin management of services, features, testimonials, and homepage sections
- add sitemap, schema markup, and stronger technical SEO structure

## Overall Conclusion

The current website is a solid visual starting point, but it is not yet a complete business website.

Right now, it functions more like a static company presentation than a managed digital platform. The design direction is usable, but the website needs major improvement in SEO structure, data handling, admin control, content publishing, and lead management.

The good news is that the current site can be upgraded into a much stronger platform. The structure already exists, but the business logic, admin tools, and search optimisation still need to be properly built.

## Recommended Positioning to the Client

The simplest way to explain the current state is:

> The website looks like a company website, but behind the scenes it is not yet operating like one.

It needs to be upgraded from a visual brochure site into a proper business website with:

- real SEO foundations
- real content publishing
- real lead capture
- real appointment management
- real admin control
