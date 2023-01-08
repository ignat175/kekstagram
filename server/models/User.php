<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $created_at
 * @property string $email
 * @property string $password_hash
 * @property string $access_token
 * @property string $username
 * @property string $avatar_path
 *
 * @property Picture[] $pictures
 * @property Comment[] $comments
 */
class User extends ActiveRecord implements IdentityInterface
{
    public $password;
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%user}}';
    }

    /**
     * Finds an identity by the given ID.
     *
     * @param string|int $id the ID to be looked for
     * @return IdentityInterface|null the identity object that matches the given ID.
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * Finds an identity by the given token.
     *
     * @param string $token the token to be looked for
     * @return IdentityInterface|null the identity object that matches the given token.
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    /**
     * @return int|string current user ID
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string current user auth key
     */
    public function getAuthKey()
    {
        // TODO: Implement getAuthKey() method.
    }

    /**
     * @param string $authKey
     * @return bool if auth key is valid for current user
     */
    public function validateAuthKey($authKey)
    {
        // TODO: Implement validateAuthKey() method.
    }

    public function rules(): array
    {
        return [
            [['email'], 'required'],
            [['email'], 'trim'],
            [['email'], 'string', 'max' => 128],
            [['email'], 'email'],
            [['email'], 'unique'],

            [['password_hash'], 'required'],
            [['password_hash'], 'trim'],
            [['password_hash'], 'string', 'max' => 255],

            [['access_token'], 'trim'],
            [['access_token'], 'string', 'max' => 128],
            [['access_token'], 'unique'],

            [['username'], 'required'],
            [['username'], 'trim'],
            [['username'], 'string', 'length' => [2, 128]],

            [['avatar_path'], 'required'],
            [['avatar_path'], 'trim'],
            [['avatar_path'], 'string', 'max' => 128],
            [['avatar_path'], 'unique'],
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            // название поля "name", атрибут "username"
            'name' => 'username',
            'avatar' => 'avatar_path',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getPictures(): ActiveQuery
    {
        return $this->hasMany(Picture::class, ['user_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getComments(): ActiveQuery
    {
        return $this->hasMany(Comment::class, ['user_id' => 'id']);
    }
}
