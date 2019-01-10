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
 * This file contains the forms to create and edit an instance of this module
 *
 * @package   mod_dialogue
 * @copyright 2013
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once ($CFG->dirroot.'/mod/dialogue/locallib.php');
require_once ($CFG->dirroot.'/course/moodleform_mod.php');

use mod_dialogue\plugin_config;

class mod_dialogue_mod_form extends moodleform_mod {

    public function definition() {
        global $CFG, $COURSE, $DB;

        $mform = $this->_form;

        $mform->addElement('header', 'general', get_string('general', 'form'));

        $mform->addElement('text', 'name', get_string('dialoguename', 'dialogue'), array('size'=>'64'));
        $mform->setType('name', PARAM_TEXT);
        $mform->addRule('name', null, 'required', null, 'client');

        moodleform_mod::standard_intro_elements();
        $choices = \mod_dialogue\local\persistent\dialogue::get_max_bytes_choices();
        $mform->addElement(
            'select',
            'maxbytes',
            get_string('maxattachmentsize', 'dialogue'),
            $choices
        );
        $mform->addHelpButton('maxbytes', 'maxattachmentsize', 'dialogue');
        $mform->setDefault('maxbytes', plugin_config::get('maxbytes'));

        $choices = \mod_dialogue\local\persistent\dialogue::get_max_attachments_choices();
        $choices[0] = get_string('uploadnotallowed');
        $mform->addElement(
            'select',
            'maxattachments',
            get_string('maxattachments', 'dialogue'),
            $choices
        );
        $mform->addHelpButton('maxattachments', 'maxattachments', 'dialogue');
        $mform->setDefault('maxattachments', plugin_config::get('maxattachments'));

        $choices = [];
        $choices['editingteacher'] = "Teacher";
        $choices['teacher'] = "Non editing teacher";
        $choices['student'] = "Student";

        $mform->addElement('searchableselector', 'openerroles', 'openerroles', $choices, array('multiple' => 'multiple'));

        $this->standard_grading_coursemodule_elements();

        $this->standard_coursemodule_elements();

        $this->add_action_buttons();
    }

    public function get_data() {
        $data = parent::get_data();
        if (!$data) {
            return false;
        }
        return $data;
    }
}
