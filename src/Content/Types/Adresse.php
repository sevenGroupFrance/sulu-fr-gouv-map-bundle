<?php

namespace SevenGroupFrance\SuluFrGouvMapBundle\Content\Types;

use Sulu\Component\Content\SimpleContentType;

class Adresse extends SimpleContentType
{
    public function __construct()
    {
        parent::__construct("adresse");
    }
}
