// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('copies_settings_test', function() {
  suite('CopiesSettingsTest', function() {
    /** @type {?PrintPreviewCopiesSettingsElement} */
    let copiesSection = null;

    /** @override */
    setup(function() {
      PolymerTest.clearBody();
      const model = document.createElement('print-preview-model');
      document.body.appendChild(model);

      copiesSection = document.createElement('print-preview-copies-settings');
      copiesSection.settings = model.settings;
      copiesSection.disabled = false;
      test_util.fakeDataBind(model, copiesSection, 'settings');
      document.body.appendChild(copiesSection);
    });

    test('collate visibility', async () => {
      const collateSection = copiesSection.$$('.checkbox');
      assertTrue(collateSection.hidden);

      copiesSection.setSetting('copies', 2);
      assertFalse(collateSection.hidden);

      // Set copies empty.
      const copiesInput =
          copiesSection.$$('print-preview-number-settings-section').getInput();
      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '', copiesSection);
      assertTrue(collateSection.hidden);

      // Set copies valid again.
      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '3', copiesSection);
      assertFalse(collateSection.hidden);

      // Set copies invalid.
      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '0', copiesSection);
      assertTrue(collateSection.hidden);
    });

    // Verifies that setting the copies value using the number input works
    // correctly.
    test('set copies', async () => {
      const copiesInput =
          copiesSection.$$('print-preview-number-settings-section').getInput();
      assertEquals('1', copiesInput.value);
      assertFalse(copiesSection.getSetting('copies').setFromUi);

      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '2', copiesSection);
      assertEquals(2, copiesSection.getSettingValue('copies'));
      assertTrue(copiesSection.getSetting('copies').valid);
      assertTrue(copiesSection.getSetting('copies').setFromUi);

      // Empty entry.
      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '', copiesSection);
      assertEquals(2, copiesSection.getSettingValue('copies'));
      assertTrue(copiesSection.getSetting('copies').valid);

      // Invalid entry.
      await print_preview_test_utils.triggerInputEvent(
          copiesInput, '0', copiesSection);
      assertEquals(1, copiesSection.getSettingValue('copies'));
      assertFalse(copiesSection.getSetting('copies').valid);
    });

    // Verifies that setting the collate value using the checkbox works
    // correctly.
    test('set collate', function() {
      const collateCheckbox = copiesSection.$.collate;
      copiesSection.setSetting('copies', 2);
      assertTrue(collateCheckbox.checked);
      assertFalse(copiesSection.getSetting('collate').setFromUi);

      MockInteractions.tap(collateCheckbox);
      assertFalse(collateCheckbox.checked);
      collateCheckbox.dispatchEvent(new CustomEvent('change'));
      assertFalse(copiesSection.getSettingValue('collate'));
      assertTrue(copiesSection.getSetting('collate').setFromUi);
    });

    // Verifies that the inputs update when the value is updated.
    test('update from settings', function() {
      const copiesInput =
          copiesSection.$$('print-preview-number-settings-section').getInput();
      const collateCheckbox = copiesSection.$.collate;

      assertEquals('1', copiesInput.value);
      copiesSection.setSetting('copies', 3);
      assertEquals('3', copiesInput.value);

      assertTrue(collateCheckbox.checked);
      copiesSection.setSetting('collate', false);
      assertFalse(collateCheckbox.checked);
    });
  });
});
