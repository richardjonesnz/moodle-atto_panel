<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto panel  version file.
 *
 * @package    atto_panel
 * @copyright  Richard Jones {@link http://richardnz.net/}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version   = 2020030100;
$plugin->requires  = 2017051500;
$plugin->component = 'atto_panel';
$plugin->maturity  = MATURITY_ALPHA;
// Human readable version information.
$plugin->release   = '1.0';
// Won't be any use without the filter.
$plugin->dependencies = array('filter_simplefilter'=>2020022801);
