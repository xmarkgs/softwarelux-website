<?php
/* Smarty version 3.1.39, created on 2021-12-29 15:42:55
  from '/home/darmowek/softwarelux.com/manager/templates/default/resource/update.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_61cc73ef47b647_45610795',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '79452bacf8e475aeca1eaf06a106e628f52020f6' => 
    array (
      0 => '/home/darmowek/softwarelux.com/manager/templates/default/resource/update.tpl',
      1 => 1622185478,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_61cc73ef47b647_45610795 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="modx-panel-resource-div"></div>
<div id="modx-resource-tvs-div"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['tvOutput']->value)===null||$tmp==='' ? '' : $tmp);?>
</div>
<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['hidden']->value, 'tv', false, NULL, 'tv', array (
));
$_smarty_tpl->tpl_vars['tv']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['tv']->value) {
$_smarty_tpl->tpl_vars['tv']->do_else = false;
?>
    <input type="hidden" id="tvdef<?php echo $_smarty_tpl->tpl_vars['tv']->value->id;?>
" value="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['tv']->value->default_text, ENT_QUOTES, 'UTF-8', true);?>
" />
    <?php echo $_smarty_tpl->tpl_vars['tv']->value->get('formElement');?>

<?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

<?php echo $_smarty_tpl->tpl_vars['onDocFormPrerender']->value;?>

<?php if ($_smarty_tpl->tpl_vars['resource']->value->richtext && $_smarty_tpl->tpl_vars['_config']->value['use_editor']) {?>
    <?php echo $_smarty_tpl->tpl_vars['onRichTextEditorInit']->value;?>

<?php }
}
}
