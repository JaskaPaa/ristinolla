<div class="box">
	<slot name="unskew">
        <span class="missing">Unknown name</span>
    </slot>
</div>

<style>
	.box {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1em;
        transform: skew(-20deg);
	}
</style>
