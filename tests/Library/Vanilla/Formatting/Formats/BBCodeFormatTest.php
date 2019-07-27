<?php
/**
 * @author Adam Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace VanillaTests\Library\Vanilla\Formatting\Formats;

use Vanilla\Contracts\Formatting\FormatInterface;
use Vanilla\Formatting\Formats\BBCodeFormat;
use VanillaTests\Fixtures\Formatting\FormatFixtureFactory;

/**
 * Tests for the BBCodeFormat.
 */
class BBCodeFormatTest extends AbstractFormatTestCaseMinimal {

    /**
     * @inheritDoc
     */
    protected function prepareFormatter(): FormatInterface {
        return self::container()->get(BBCodeFormat::class);
    }

    /**
     * @inheritDoc
     */
    protected function prepareFixtures(): array {
        return (new FormatFixtureFactory('bbcode'))->getAllFixtures();
    }
}
