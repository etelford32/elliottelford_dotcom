'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function SubscribePage() {
  return (
    <>
      {/* Mailchimp Styles */}
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-foreground font-display mb-6"
            >
              Stay Connected
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-foreground/80 font-body max-w-2xl mx-auto mb-4"
            >
              Join the journey through code, physics, and the cosmos
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-foreground/60 font-body max-w-2xl mx-auto"
            >
              Get exclusive updates on new simulations, blog posts, music releases, and yoga teachings from Elliot Telford
            </motion.p>
          </motion.div>

          {/* Mailchimp Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative"
          >
            <div className="bg-card-bg/50 backdrop-blur-lg border border-accent/30 rounded-2xl shadow-2xl shadow-accent/10 p-8 md:p-12">
              <div id="mc_embed_shell">
                <style dangerouslySetInnerHTML={{ __html: `
                  #mc_embed_signup {
                    background: transparent !important;
                    clear: left;
                    font: 14px Helvetica, Arial, sans-serif;
                    width: 100% !important;
                    max-width: 600px;
                    margin: 0 auto;
                  }

                  #mc_embed_signup form {
                    padding: 0 !important;
                  }

                  #mc_embed_signup h2 {
                    color: var(--foreground) !important;
                    font-family: var(--font-display) !important;
                    font-size: 2rem !important;
                    font-weight: 700 !important;
                    margin-bottom: 1.5rem !important;
                    text-align: center !important;
                  }

                  #mc_embed_signup .indicates-required {
                    color: var(--foreground) !important;
                    opacity: 0.7;
                    text-align: right;
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                  }

                  #mc_embed_signup .mc-field-group {
                    margin-bottom: 1.5rem !important;
                  }

                  #mc_embed_signup label {
                    color: var(--foreground) !important;
                    font-weight: 600 !important;
                    font-size: 1rem !important;
                    margin-bottom: 0.5rem !important;
                    display: block !important;
                  }

                  #mc_embed_signup input[type="email"],
                  #mc_embed_signup input[type="text"] {
                    width: 100% !important;
                    padding: 0.75rem 1rem !important;
                    background: var(--background) !important;
                    border: 2px solid var(--accent) !important;
                    border-radius: 0.5rem !important;
                    color: var(--foreground) !important;
                    font-size: 1rem !important;
                    transition: all 0.3s ease !important;
                  }

                  #mc_embed_signup input[type="email"]:focus,
                  #mc_embed_signup input[type="text"]:focus {
                    outline: none !important;
                    border-color: var(--accent) !important;
                    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1) !important;
                  }

                  #mc_embed_signup .helper_text {
                    color: var(--foreground) !important;
                    opacity: 0.6;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                  }

                  #mc_embed_signup .content__gdpr {
                    margin-top: 2rem !important;
                  }

                  #mc_embed_signup .content__gdpr label {
                    color: var(--foreground) !important;
                    font-size: 1.125rem !important;
                    font-weight: 700 !important;
                    margin-bottom: 1rem !important;
                  }

                  #mc_embed_signup .content__gdpr p {
                    color: var(--foreground) !important;
                    opacity: 0.8;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                  }

                  #mc_embed_signup .mc_fieldset {
                    border: none !important;
                    padding: 1rem 0 !important;
                    margin-bottom: 1rem !important;
                  }

                  #mc_embed_signup .checkbox.subfield {
                    display: flex !important;
                    align-items: center !important;
                    margin-bottom: 1rem !important;
                  }

                  #mc_embed_signup .checkbox.subfield input[type="checkbox"] {
                    width: auto !important;
                    margin-right: 0.75rem !important;
                    accent-color: var(--accent) !important;
                    width: 1.25rem !important;
                    height: 1.25rem !important;
                  }

                  #mc_embed_signup .checkbox.subfield span {
                    color: var(--foreground) !important;
                    font-size: 1rem !important;
                  }

                  #mc_embed_signup .content__gdprLegal {
                    margin-top: 1.5rem !important;
                    padding-top: 1.5rem !important;
                    border-top: 1px solid var(--accent) !important;
                    opacity: 0.3;
                  }

                  #mc_embed_signup .content__gdprLegal p {
                    font-size: 0.875rem !important;
                    opacity: 0.6;
                  }

                  #mc_embed_signup .content__gdprLegal a {
                    color: var(--accent) !important;
                    text-decoration: underline !important;
                  }

                  #mc_embed_signup .button {
                    background: linear-gradient(135deg, var(--accent), var(--secondary)) !important;
                    color: var(--primary) !important;
                    font-weight: 700 !important;
                    font-size: 1.125rem !important;
                    padding: 1rem 3rem !important;
                    border: none !important;
                    border-radius: 0.75rem !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    width: 100% !important;
                    margin-top: 2rem !important;
                  }

                  #mc_embed_signup .button:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.3) !important;
                  }

                  #mc_embed_signup .asterisk {
                    color: var(--accent) !important;
                  }

                  #mc_embed_signup .refferal_badge {
                    opacity: 0.4 !important;
                    margin-top: 1rem !important;
                  }

                  #mc_embed_signup #mce-responses {
                    margin-top: 1rem !important;
                  }

                  #mc_embed_signup .response {
                    padding: 1rem !important;
                    border-radius: 0.5rem !important;
                    margin-bottom: 1rem !important;
                  }

                  #mc_embed_signup #mce-error-response {
                    background-color: rgba(239, 68, 68, 0.1) !important;
                    color: #ef4444 !important;
                    border: 1px solid #ef4444 !important;
                  }

                  #mc_embed_signup #mce-success-response {
                    background-color: rgba(100, 255, 218, 0.1) !important;
                    color: var(--accent) !important;
                    border: 1px solid var(--accent) !important;
                  }
                ` }} />

                <div id="mc_embed_signup">
                  <form
                    action="https://elliottelford.us12.list-manage.com/subscribe/post?u=389f37df4a3516e008514bbf9&amp;id=2cb5bc6741&amp;v_id=6850&amp;f_id=007144e0f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                  >
                    <div id="mc_embed_signup_scroll">
                      <h2>Subscribe</h2>
                      <div className="indicates-required">
                        <span className="asterisk">*</span> indicates required
                      </div>

                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">
                          Email Address <span className="asterisk">*</span>
                        </label>
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email"
                          id="mce-EMAIL"
                          required
                          defaultValue=""
                        />
                      </div>

                      <div className="mc-field-group">
                        <label htmlFor="mce-FNAME">
                          First Name <span className="asterisk">*</span>
                        </label>
                        <input
                          type="text"
                          name="FNAME"
                          className="required text"
                          id="mce-FNAME"
                          required
                          defaultValue=""
                        />
                      </div>

                      <div className="mc-field-group">
                        <label htmlFor="mce-LNAME">Last Name</label>
                        <input
                          type="text"
                          name="LNAME"
                          className="text"
                          id="mce-LNAME"
                          defaultValue=""
                        />
                      </div>

                      <div className="mc-field-group">
                        <label htmlFor="mce-PHONE">Phone Number</label>
                        <input
                          type="text"
                          name="PHONE"
                          className="REQ_CSS"
                          id="mce-PHONE"
                          defaultValue=""
                        />
                        <span id="mce-PHONE-HELPERTEXT" className="helper_text">
                          (not required)
                        </span>
                      </div>

                      <div id="mergeRow-gdpr" className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group">
                        <div className="content__gdpr">
                          <label>Marketing Permissions</label>
                          <p>
                            the E.T. will use the information you provide on this form to be in touch with you and to provide updates and marketing. Please let us know all the ways you would like to hear from us:
                          </p>
                          <fieldset className="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field">
                            <label className="checkbox subfield" htmlFor="gdpr9345">
                              <input
                                type="checkbox"
                                id="gdpr_9345"
                                name="gdpr[9345]"
                                className="gdpr"
                                value="Y"
                              />
                              <span>New Post Updates from the Website, elliottelford.com</span>
                            </label>
                            <label className="checkbox subfield" htmlFor="gdpr9349">
                              <input
                                type="checkbox"
                                id="gdpr_9349"
                                name="gdpr[9349]"
                                className="gdpr"
                                value="Y"
                              />
                              <span>Elliot Telford Yoga Updates</span>
                            </label>
                            <label className="checkbox subfield" htmlFor="gdpr91478">
                              <input
                                type="checkbox"
                                id="gdpr_91478"
                                name="gdpr[91478]"
                                className="gdpr"
                                value="Y"
                              />
                              <span>&quot;the E.T.&quot; Music production Updates</span>
                            </label>
                          </fieldset>
                          <p>
                            You can change your mind at any time by clicking the unsubscribe link in the footer of any email you receive from us, or by contacting us at etelford32@gmail.com. We will treat your information with respect. For more information about our privacy practices please visit our website. By clicking below, you agree that we may process your information in accordance with these terms.
                          </p>
                        </div>
                        <div className="content__gdprLegal">
                          <p>
                            We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing.{' '}
                            <a href="https://mailchimp.com/legal/terms" target="_blank" rel="noopener noreferrer">
                              Learn more
                            </a>{' '}
                            about Mailchimp&apos;s privacy practices.
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'none' }}>
                        <input type="hidden" name="tags" value="10531486,10531718" />
                      </div>

                      <div id="mce-responses" className="clear foot">
                        <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                        <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                      </div>

                      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                        <input
                          type="text"
                          name="b_389f37df4a3516e008514bbf9_2cb5bc6741"
                          tabIndex={-1}
                          defaultValue=""
                        />
                      </div>

                      <div className="optionalParent">
                        <div className="clear foot">
                          <input
                            type="submit"
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className="button"
                            value="Subscribe"
                          />
                          <p style={{ margin: '0px auto' }}>
                            <a
                              href="http://eepurl.com/iXfQ1o"
                              title="Mailchimp - email marketing made easy and fun"
                            >
                              <span style={{ display: 'inline-block', backgroundColor: 'transparent', borderRadius: '4px' }}>
                                <img
                                  className="refferal_badge"
                                  src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                                  alt="Intuit Mailchimp"
                                  style={{ width: '220px', height: '40px', display: 'flex', padding: '2px 0px', justifyContent: 'center', alignItems: 'center' }}
                                />
                              </span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground/60 text-sm">
              🔒 Your privacy matters. We&apos;ll never share your information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mailchimp Scripts */}
      <Script
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        strategy="lazyOnload"
      />
      <Script id="mailchimp-init" strategy="lazyOnload">
        {`
          (function($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0]='EMAIL';ftypes[0]='email';
            fnames[1]='FNAME';ftypes[1]='text';
            fnames[2]='LNAME';ftypes[2]='text';
            fnames[4]='PHONE';ftypes[4]='phone';
          }(jQuery));
          var $mcj = jQuery.noConflict(true);
        `}
      </Script>
    </>
  );
}
