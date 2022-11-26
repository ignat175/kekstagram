<?php

namespace app\controllers;

use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\Cors;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;
use yii\web\UploadedFile;

class PictureController extends ActiveController
{
    public $modelClass = 'app\models\Picture';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
            ],
        ];
        return $behaviors;
    }

    public function actions(): array
    {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(): ActiveRecordInterface
    {
        $model = new $this->modelClass;
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        $model->imageFile = UploadedFile::getInstanceByName('filename');
        $filePath = uniqid("{$model->imageFile->baseName}_") . '.' . $model->imageFile->extension;
        $model->url = $filePath;

        if ($model->save()) {
            $model->imageFile->saveAs('uploads/' . $filePath);

            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', $model->getPrimaryKey(true));
            $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }

        return $model;
    }
}
