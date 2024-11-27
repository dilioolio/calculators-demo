<?php
/*
Plugin Name: Marketing Calculators
Description: A collection of professional marketing calculators including CPC, CPA, ROI, ROAS, and more
Version: 1.0
Author: Your Name
*/

// Prevent direct access
if (!defined('ABSPATH')) exit;

function marketing_calculators_enqueue_assets() {
    // Enqueue React and ReactDOM from WordPress
    wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.0.0', true);
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.0.0', true);
    
    wp_enqueue_style(
        'marketing-calculators-styles',
        plugins_url('dist/assets/index.css', __FILE__),
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'marketing-calculators-js',
        plugins_url('dist/assets/index.js', __FILE__),
        array('react', 'react-dom'),
        '1.0.0',
        true
    );

    // Add inline script to initialize calculators after DOM is ready
    wp_add_inline_script('marketing-calculators-js', '
        document.addEventListener("DOMContentLoaded", function() {
            const calculators = document.querySelectorAll("[data-calculator-type]");
            calculators.forEach(function(calculator) {
                const root = calculator;
                const calculatorType = root.getAttribute("data-calculator-type");
                const themeColor = root.getAttribute("data-theme-color") || "blue";
                
                // Create a new div for React to mount
                const mountPoint = document.createElement("div");
                mountPoint.setAttribute("data-calculator-type", calculatorType);
                mountPoint.setAttribute("data-theme-color", themeColor);
                root.appendChild(mountPoint);
                
                // Initialize React app
                window.initializeCalculator(mountPoint);
            });
        });
    ');
}
add_action('wp_enqueue_scripts', 'marketing_calculators_enqueue_assets');

function cpc_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="cpc" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('cpc_calculator', 'cpc_calculator_shortcode');

// Similar updates for other calculator shortcodes
function cpa_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="cpa" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('cpa_calculator', 'cpa_calculator_shortcode');

function revenue_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="revenue" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('revenue_calculator', 'revenue_calculator_shortcode');

function inventory_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="inventory" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('inventory_calculator', 'inventory_calculator_shortcode');

function roi_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="roi" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('roi_calculator', 'roi_calculator_shortcode');

function roas_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'blue'
    ), $atts);

    return sprintf(
        '<div class="marketing-calculator" data-calculator-type="roas" data-theme-color="%s"></div>',
        esc_attr($attributes['theme'])
    );
}
add_shortcode('roas_calculator', 'roas_calculator_shortcode');

// Add admin menu
function marketing_calculators_admin_menu() {
    add_menu_page(
        'Marketing Calculators',
        'Marketing Calculators',
        'manage_options',
        'marketing-calculators',
        'marketing_calculators_admin_page',
        'dashicons-calculator'
    );
}
add_action('admin_menu', 'marketing_calculators_admin_menu');

function marketing_calculators_admin_page() {
    ?>
    <div class="wrap">
        <h1>Marketing Calculators</h1>
        <div class="card">
            <h2>Available Shortcodes</h2>
            <p><strong>CPC Calculator:</strong></p>
            <code>[cpc_calculator theme="blue|purple|emerald"]</code>
            
            <p><strong>CPA Calculator:</strong></p>
            <code>[cpa_calculator theme="blue|purple|emerald"]</code>
            
            <p><strong>Ad Revenue Calculator:</strong></p>
            <code>[revenue_calculator theme="blue|purple|emerald"]</code>
            
            <p><strong>Inventory Calculator:</strong></p>
            <code>[inventory_calculator theme="blue|purple|emerald"]</code>
            
            <p><strong>ROI Calculator:</strong></p>
            <code>[roi_calculator theme="blue|purple|emerald"]</code>
            
            <p><strong>ROAS Calculator:</strong></p>
            <code>[roas_calculator theme="blue|purple|emerald"]</code>
        </div>
        
        <div class="card" style="margin-top: 20px;">
            <h2>Usage Instructions</h2>
            <ol>
                <li>Copy the desired shortcode</li>
                <li>Optionally add a theme color (blue, purple, or emerald)</li>
                <li>Paste it into any post, page, or widget area</li>
                <li>The calculator will appear on your front end</li>
            </ol>
        </div>
        
        <div class="card" style="margin-top: 20px;">
            <h2>Calculator Descriptions</h2>
            <ul>
                <li><strong>CPC (Cost Per Click):</strong> Calculate advertising costs based on click data</li>
                <li><strong>CPA (Cost Per Acquisition):</strong> Measure cost effectiveness of acquiring customers</li>
                <li><strong>Ad Revenue:</strong> Forecast potential advertising revenue based on traffic</li>
                <li><strong>Inventory:</strong> Calculate optimal inventory levels and reorder points</li>
                <li><strong>ROI (Return on Investment):</strong> Measure the profitability of investments</li>
                <li><strong>ROAS (Return on Ad Spend):</strong> Calculate advertising campaign effectiveness</li>
            </ul>
        </div>
    </div>
    <?php
}