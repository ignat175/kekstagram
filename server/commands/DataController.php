<?php

namespace app\commands;

use Yii;
use app\models\Effect;
use app\models\User;
use yii\console\Controller;
use yii\console\ExitCode;

class DataController extends Controller
{
    const EFFECTS = [
        [
            'name' => 'none',
            'css_filter' => null,
            'range_min' => null,
            'range_max' => null,
            'step' => null,
            'start' => null,
            'unit' => null,
        ],
        [
            'name' => 'chrome',
            'css_filter' => 'grayscale',
            'range_min' => 0,
            'range_max' => 1,
            'step' => 0.1,
            'start' => 1,
            'unit' => null,
        ],
        [
            'name' => 'sepia',
            'css_filter' => 'sepia',
            'range_min' => 0,
            'range_max' => 1,
            'step' => 0.1,
            'start' => 1,
            'unit' => null,
        ],
        [
            'name' => 'marvin',
            'css_filter' => 'invert',
            'range_min' => 0,
            'range_max' => 100,
            'step' => 1,
            'start' => 100,
            'unit' => '%',
        ],
        [
            'name' => 'phobos',
            'css_filter' => 'blur',
            'range_min' => 0,
            'range_max' => 3,
            'step' => 0.1,
            'start' => 3,
            'unit' => 'px',
        ],
        [
            'name' => 'heat',
            'css_filter' => 'brightness',
            'range_min' => 1,
            'range_max' => 3,
            'step' => 0.1,
            'start' => 3,
            'unit' => null,
        ]
    ];

    public function actionImport(): int
    {
        $user = new User();
        $user->email = 'admin@admin.net';
        $user->username = 'admin';
        $user->password_hash = Yii::$app->getSecurity()->generatePasswordHash('123');
        $user->access_token = Yii::$app->getSecurity()->generateRandomString();
        $user->avatar_path = './img/avatar-1.svg';
        $user->save();

        foreach (self::EFFECTS as $effect_item) {
            $effect = new Effect();

            $effect->name = $effect_item['name'];
            $effect->css_filter = $effect_item['css_filter'];
            $effect->range_min = $effect_item['range_min'];
            $effect->range_max = $effect_item['range_max'];
            $effect->step = $effect_item['step'];
            $effect->start = $effect_item['start'];
            $effect->unit = $effect_item['unit'];

            $effect->save();
        }

        return ExitCode::OK;
    }
}
